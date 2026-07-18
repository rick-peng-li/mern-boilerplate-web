import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Message from '../models/Message.js';
import { deleteAllAvatars } from './utils.js';
import { IMAGES_FOLDER_PATH } from './constants.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const names = [
  'John Doe',
  'Jane Smith',
  'Michael Johnson',
  'Emily Davis',
  'William Brown',
];

const bios = [
  '热爱编程，喜欢探索新技术。目前专注于全栈开发，对React和Node.js有深入研究。',
  '设计师兼开发者，热衷于创造美观且实用的用户界面。',
  '资深后端工程师，擅长系统架构设计和性能优化。',
  '产品经理转技术，致力于构建用户体验极佳的应用。',
  '开源爱好者，活跃于GitHub社区，喜欢分享技术心得。',
];

const paragraphs = [
  '这是一条测试消息内容，用于验证消息系统的功能。系统应该能够正确存储和显示用户发送的消息。',
  '欢迎使用MERN Boilerplate！这是一个功能完善的全栈应用模板，可以帮助你快速构建现代化的Web应用。',
  '我们致力于提供最好的开发体验，让开发者能够专注于业务逻辑的实现，而不必担心基础设施的配置。',
  '最新版本的MERN Boilerplate支持React 18、Vite构建工具和Redux Toolkit状态管理。',
  '项目已经支持Docker容器化部署，可以轻松地在生产环境中运行。',
];

export const seedDb = async () => {
  console.log('Seeding database...');

  try {
    await User.deleteMany({});
    await Message.deleteMany({});
    await deleteAllAvatars(join(__dirname, '../../server', IMAGES_FOLDER_PATH));

  const usersPromises = [...Array(3).keys()].map(async (index) => {
    const user = new User({
      provider: 'email',
      username: `user${index}`,
      email: `email${index}@email.com`,
      password: '123456789',
      name: names[index],
      avatar: `avatar${index}.jpg`,
      bio: bios[index],
    });

    if (index === 0) {
      user.role = 'ADMIN';
    }
    await user.registerUser(user);

    return user.save();
  });

  await Promise.all(usersPromises);

  const messagePromises = [...Array(9).keys()].map((index) => {
    const message = new Message({
      text: paragraphs[index % paragraphs.length],
    });
    return message;
  });

  await Promise.all(
    messagePromises.map(async (message) => {
      await message.save();
    }),
  );

  const users = await User.find();
  const messages = await Message.find();

  await Promise.all(
      users.map(async (user, index) => {
        const threeMessagesIds = messages.slice(index * 3, index * 3 + 3).map((m) => m.id);
        await User.updateOne({ _id: user.id }, { $push: { messages: threeMessagesIds } });
      }),
    );

    await Promise.all(
      messages.map(async (message, index) => {
        const j = Math.floor(index / 3);
        const user = users[j];
        await Message.updateOne(
          { _id: message.id },
          {
            $set: {
              user: user.id,
            },
          },
        );
      }),
    );

    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding error:', err);
  }
};