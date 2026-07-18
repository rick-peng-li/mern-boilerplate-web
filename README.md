# MERN Boilerplate Web

这是一个基于 React、Redux Toolkit、Vite、Express、Mongoose 和 Passport 的全栈项目模板。帮助开发者快速搭建项目，跳过繁琐的配置，直接进入业务开发。

## 技术架构

### 前端技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| React | 18.3+ | UI 框架 |
| Redux Toolkit | 2.2+ | 状态管理 |
| React Router DOM | 6.23+ | 路由管理 |
| Vite | 8.1+ | 构建工具 |
| Formik | 2.4+ | 表单处理 |
| Yup | 1.4+ | 表单验证 |
| Axios | 1.7+ | HTTP 请求 |
| Moment | 2.30+ | 日期处理 |
| JWT Decode | 4.0+ | JWT 解析 |
| JS Cookie | 3.0+ | Cookie 管理 |

### 后端技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| Node.js | 20.x LTS | 运行环境 |
| Express | 4.19+ | Web 框架 |
| Mongoose | 8.4+ | MongoDB ODM |
| Passport | 0.7+ | 认证中间件 |
| Passport Local | 1.0+ | 本地认证策略 |
| Passport JWT | 4.0+ | JWT 认证策略 |
| Passport Facebook | 3.0+ | Facebook OAuth |
| Passport Google OAuth2 | 2.0+ | Google OAuth |
| Joi | 17.13+ | 服务端验证 |
| Bcrypt | 2.4+ | 密码加密 |
| JsonWebToken | 9.0+ | JWT 生成 |
| Multer | 1.4+ | 文件上传 |

### 数据库

- MongoDB (支持开发环境本地数据库和生产环境 MongoDB Atlas)

## 项目结构

```
mern-boilerplate-web/
├── client/                    # 前端代码
│   ├── public/               # 静态资源
│   ├── src/
│   │   ├── api/              # API 请求封装
│   │   ├── components/       # 公共组件
│   │   │   ├── Footer/       # 页脚组件
│   │   │   ├── Loader/       # 加载动画组件
│   │   │   ├── Message/      # 消息组件
│   │   │   ├── MessageForm/  # 消息表单组件
│   │   │   ├── MessageList/  # 消息列表组件
│   │   │   ├── Navbar/       # 导航栏组件
│   │   │   └── Post/         # 帖子相关组件
│   │   ├── constants/        # 常量配置
│   │   ├── hooks/            # 自定义 Hooks
│   │   ├── layout/           # 布局组件
│   │   ├── pages/            # 页面组件
│   │   │   ├── Admin/        # 管理员页面
│   │   │   ├── Home/         # 首页
│   │   │   ├── Login/        # 登录页面
│   │   │   ├── NotFound/     # 404 页面
│   │   │   ├── Notifications/# 通知页面
│   │   │   ├── Posts/        # 帖子页面
│   │   │   ├── Profile/      # 用户个人资料页面
│   │   │   ├── Register/     # 注册页面
│   │   │   ├── Settings/     # 设置页面
│   │   │   └── Users/        # 用户列表页面
│   │   ├── router/           # 路由配置
│   │   ├── store/            # Redux 状态管理
│   │   │   ├── authSlice.js  # 认证状态
│   │   │   ├── postsSlice.js # 帖子状态
│   │   │   ├── commentsSlice.js # 评论状态
│   │   │   ├── notificationsSlice.js # 通知状态
│   │   │   └── index.js      # Store 配置
│   │   ├── utils/            # 工具函数
│   │   ├── App.jsx           # 主应用组件
│   │   ├── index.css         # 全局样式
│   │   └── index.jsx         # 应用入口
│   ├── docker/               # Docker 配置
│   ├── .env.example          # 环境变量示例
│   ├── .gitignore            # Git 忽略配置
│   ├── .prettierrc           # Prettier 配置
│   ├── package.json          # 前端依赖
│   └── vite.config.js        # Vite 配置
├── server/                    # 后端代码
│   ├── docker/               # Docker 配置
│   ├── public/               # 静态文件
│   │   └── images/           # 用户头像存储
│   ├── security/             # SSL 证书
│   ├── src/
│   │   ├── middleware/       # 中间件
│   │   │   ├── requireJwtAuth.js     # JWT 认证中间件
│   │   │   └── requireLocalAuth.js   # 本地认证中间件
│   │   ├── models/           # Mongoose 模型
│   │   │   ├── Comment.js    # 评论模型
│   │   │   ├── Message.js    # 消息模型
│   │   │   ├── Notification.js # 通知模型
│   │   │   ├── Post.js       # 帖子模型
│   │   │   └── User.js       # 用户模型
│   │   ├── routes/           # 路由
│   │   │   ├── api/          # API 路由
│   │   │   │   ├── comments.js     # 评论接口
│   │   │   │   ├── messages.js     # 消息接口
│   │   │   │   ├── notifications.js # 通知接口
│   │   │   │   ├── posts.js        # 帖子接口
│   │   │   │   ├── users.js        # 用户接口
│   │   │   │   └── index.js        # API 路由入口
│   │   │   ├── facebookAuth.js   # Facebook 认证路由
│   │   │   ├── googleAuth.js     # Google 认证路由
│   │   │   ├── localAuth.js      # 本地认证路由
│   │   │   └── index.js          # 路由入口
│   │   ├── services/         # 服务层
│   │   │   ├── facebookStrategy.js   # Facebook 认证策略
│   │   │   ├── googleStrategy.js     # Google 认证策略
│   │   │   ├── jwtStrategy.js        # JWT 认证策略
│   │   │   └── localStrategy.js      # 本地认证策略
│   │   ├── utils/            # 工具函数
│   │   │   ├── constants.js  # 常量定义
│   │   │   ├── seed.js       # 数据库初始化数据
│   │   │   └── utils.js      # 通用工具函数
│   │   └── index.js          # 服务器入口
│   ├── .env.example          # 环境变量示例
│   ├── .gitignore            # Git 忽略配置
│   ├── .prettierrc           # Prettier 配置
│   └── package.json          # 后端依赖
├── docker-compose.yml        # Docker Compose 配置
└── package.json              # 根目录配置
```

## 页面功能

### 首页 (Home)
- 展示欢迎信息
- 已登录用户可以发布新消息
- 显示所有消息列表
- 支持数据库重新初始化

### 登录页 (Login)
- 邮箱/密码登录
- Google OAuth 登录
- Facebook OAuth 登录

### 注册页 (Register)
- 用户注册表单
- 表单验证
- 用户名、邮箱唯一性检查

### 用户列表页 (Users)
- 显示所有用户列表
- 用户信息展示（头像、用户名、邮箱、注册时间等）
- 点击用户可进入个人资料页
- 需要登录才能访问

### 个人资料页 (Profile)
- 显示用户详细信息
- 用户可编辑自己的资料（包括简介）
- 管理员可编辑任意用户资料
- 支持头像上传
- 支持删除用户账号
- 需要登录才能访问

### 帖子页面 (Posts)
- 帖子列表展示
- 创建新帖子
- 帖子详情查看
- 帖子编辑和删除
- 帖子点赞功能

### 评论系统
- 在帖子下发表评论
- 查看评论列表
- 评论编辑和删除

### 通知页面 (Notifications)
- 查看系统通知
- 点赞通知提醒
- 评论通知提醒

### 设置页面 (Settings)
- 用户账号设置
- 个人偏好设置

### 管理员页面 (Admin)
- 管理员专属页面
- 只有管理员角色可以访问
- 展示管理员权限信息

### 404 页面 (NotFound)
- 处理无效路由

## API 接口

### 认证接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/auth/login` | 用户登录 |
| POST | `/auth/register` | 用户注册 |
| GET | `/auth/logout` | 用户登出 |
| GET | `/auth/google` | Google 登录 |
| GET | `/auth/google/callback` | Google 回调 |
| GET | `/auth/facebook` | Facebook 登录 |
| GET | `/auth/facebook/callback` | Facebook 回调 |

### 用户接口

| 方法 | 路径 | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/users/me` | 获取当前用户信息 | 登录用户 |
| GET | `/api/users/:username` | 获取指定用户信息 | 登录用户 |
| GET | `/api/users` | 获取所有用户列表 | 登录用户 |
| PUT | `/api/users/:id` | 更新用户信息 | 本人或管理员 |
| DELETE | `/api/users/:id` | 删除用户 | 本人或管理员 |
| GET | `/api/users/reseed` | 重新初始化数据库 | 公开 |

### 消息接口

| 方法 | 路径 | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/messages` | 获取所有消息列表 | 登录用户 |
| GET | `/api/messages/:id` | 获取单条消息 | 登录用户 |
| POST | `/api/messages` | 创建新消息 | 登录用户 |
| PUT | `/api/messages/:id` | 更新消息 | 本人或管理员 |
| DELETE | `/api/messages/:id` | 删除消息 | 本人或管理员 |

### 帖子接口

| 方法 | 路径 | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/posts` | 获取所有帖子列表 | 公开 |
| GET | `/api/posts/:id` | 获取单条帖子 | 公开 |
| POST | `/api/posts` | 创建新帖子 | 登录用户 |
| PUT | `/api/posts/:id` | 更新帖子 | 本人或管理员 |
| DELETE | `/api/posts/:id` | 删除帖子 | 本人或管理员 |
| POST | `/api/posts/:id/like` | 点赞/取消点赞 | 登录用户 |

### 评论接口

| 方法 | 路径 | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/comments` | 获取所有评论 | 公开 |
| GET | `/api/comments/:id` | 获取单条评论 | 公开 |
| POST | `/api/comments` | 创建评论 | 登录用户 |
| PUT | `/api/comments/:id` | 更新评论 | 本人或管理员 |
| DELETE | `/api/comments/:id` | 删除评论 | 本人或管理员 |

### 通知接口

| 方法 | 路径 | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/notifications` | 获取通知列表 | 登录用户 |
| DELETE | `/api/notifications/:id` | 删除通知 | 登录用户 |

## 角色权限

### USER 角色
- 查看首页消息
- 发布新消息
- 编辑和删除自己的消息
- 查看用户列表
- 查看个人资料
- 编辑和删除自己的账号
- 发布和管理帖子
- 发表评论
- 查看通知

### ADMIN 角色
- 拥有 USER 角色的所有权限
- 编辑和删除任意用户的消息
- 编辑和删除任意用户账号
- 编辑和删除任意帖子和评论
- 访问管理员专属页面

## 启动方式

### Docker 部署（推荐）

```bash
cd mern-boilerplate-web
docker-compose up --build -d
```

**Docker 访问端口：**
- 前端页面：`http://localhost:3002`
- 后端 API：`http://localhost:5001`
- MongoDB：`mongodb://localhost:27017`

### 开发环境

#### 1. 克隆项目

```bash
git clone https://github.com/nemanjam/mern-boilerplate.git
cd mern-boilerplate-web
```

#### 2. 配置环境变量

**服务端配置**

复制 `server/.env.example` 为 `server/.env`，填写以下配置：

```env
MONGO_INITDB_DATABASE=mernboilerplate
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password

MONGO_URI_DEV=mongodb://localhost:27017/mernboilerplate
MONGO_URI_PROD=mongodb://mdp-mongo:27017/mernboilerplate

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=/auth/google/callback

FACEBOOK_APP_ID=
FACEBOOK_SECRET=
FACEBOOK_CALLBACK_URL=/auth/facebook/callback

JWT_SECRET_DEV=secret
JWT_SECRET_PROD=secret

CLIENT_URL_DEV=http://localhost:3000
SERVER_URL_DEV=http://localhost:5000

CLIENT_URL_PROD=http://localhost:3000
SERVER_URL_PROD=http://localhost:5000

PORT=80
```

**客户端配置**

复制 `client/.env.example` 为 `client/.env`，填写以下配置：

```env
REACT_APP_BASE_URL=http://localhost:5000
```

#### 3. 安装依赖

**服务端**

```bash
cd server
npm install
```

**客户端**

```bash
cd client
npm install
```

#### 4. 启动服务

**方式一：分别启动**

启动服务端：

```bash
cd server
npm run dev
```

启动客户端：

```bash
cd client
npm run dev
```

**开发环境访问地址：**
- 客户端：`http://localhost:3000`
- 服务端：`http://localhost:5000`

## 默认登录账号

项目启动时会自动初始化数据库，创建以下测试账号：

| 用户名 | 邮箱 | 密码 | 角色 |
| --- | --- | --- | --- |
| user0 | email0@email.com | 123456789 | ADMIN |
| user1 | email1@email.com | 123456789 | USER |
| user2 | email2@email.com | 123456789 | USER |

**管理员账号：**
- 邮箱：`email0@email.com`
- 密码：`123456789`

## 数据库初始化

项目启动时会自动执行 `seed.js`，初始化示例用户、消息和帖子数据。可通过访问 `/api/users/reseed` 重新初始化数据库。

## 功能特点

- ✅ 完整的用户认证系统（本地认证 + Google/Facebook OAuth）
- ✅ JWT 保护的 API 接口
- ✅ 用户角色权限管理（USER/ADMIN）
- ✅ 消息 CRUD 操作
- ✅ 帖子系统（发布、编辑、删除、点赞）
- ✅ 评论系统
- ✅ 通知系统
- ✅ 用户资料管理（头像上传、资料编辑、简介）
- ✅ 设置页面
- ✅ 服务端和客户端表单验证
- ✅ 响应式设计
- ✅ 加载状态处理
- ✅ Docker 支持
- ✅ Vite 构建工具
- ✅ Redux Toolkit 状态管理

## 许可证

MIT License