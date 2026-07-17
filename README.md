# MERN Boilerplate Web

这是一个基于 React、Redux、Express、Mongoose 和 Passport 的全栈项目模板。帮助开发者快速搭建项目，跳过繁琐的配置，直接进入业务开发。


## 技术架构

### 前端技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| React | 16.13+ | UI 框架 |
| Redux | 4.0+ | 状态管理 |
| Redux Thunk | 2.3+ | 异步操作中间件 |
| React Router DOM | 5.1+ | 路由管理 |
| Formik | 2.1+ | 表单处理 |
| Yup | 0.28+ | 表单验证 |
| Axios | 0.19+ | HTTP 请求 |
| Moment | 2.24+ | 日期处理 |
| JWT Decode | 2.2+ | JWT 解析 |
| JS Cookie | 2.2+ | Cookie 管理 |

### 后端技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| Express | 4.17+ | Web 框架 |
| Mongoose | 5.9+ | MongoDB ODM |
| Passport | 0.4+ | 认证中间件 |
| Passport Local | 1.0+ | 本地认证策略 |
| Passport JWT | 4.0+ | JWT 认证策略 |
| Passport Facebook | 3.0+ | Facebook OAuth |
| Passport Google OAuth2 | 0.2+ | Google OAuth |
| Joi | 14.3+ | 服务端验证 |
| Bcrypt | 2.4+ | 密码加密 |
| JsonWebToken | 8.5+ | JWT 生成 |
| Multer | 1.4+ | 文件上传 |
| Babel | 7.x | ES6+ 转译 |

### 数据库

- MongoDB (支持开发环境本地数据库和生产环境 MongoDB Atlas)

## 项目结构

```
mern-boilerplate-web/
├── client/                    # 前端代码
│   ├── public/               # 静态资源
│   ├── src/
│   │   ├── components/       # 公共组件
│   │   │   ├── Footer/       # 页脚组件
│   │   │   ├── Loader/       # 加载动画组件
│   │   │   ├── Message/      # 消息组件
│   │   │   ├── MessageForm/  # 消息表单组件
│   │   │   ├── MessageList/  # 消息列表组件
│   │   │   └── Navbar/       # 导航栏组件
│   │   ├── constants/        # 常量配置
│   │   ├── hoc/              # 高阶组件
│   │   │   ├── requireAdmin.js   # 管理员权限控制
│   │   │   └── requireAuth.js    # 登录权限控制
│   │   ├── layout/           # 布局组件
│   │   ├── pages/            # 页面组件
│   │   │   ├── Admin/        # 管理员页面
│   │   │   ├── Home/         # 首页
│   │   │   ├── Login/        # 登录页面
│   │   │   ├── NotFound/     # 404 页面
│   │   │   ├── Profile/      # 用户个人资料页面
│   │   │   ├── Register/     # 注册页面
│   │   │   └── Users/        # 用户列表页面
│   │   ├── store/            # Redux 状态管理
│   │   │   ├── actions/      # Action 创建函数
│   │   │   ├── reducers/     # Reducer 函数
│   │   │   └── types.js      # Action 类型常量
│   │   ├── App.js            # 主应用组件
│   │   ├── index.css         # 全局样式
│   │   └── index.js          # 应用入口
│   ├── .env.example          # 环境变量示例
│   ├── .gitignore            # Git 忽略配置
│   ├── .prettierrc           # Prettier 配置
│   └── package.json          # 前端依赖
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
│   │   │   ├── Message.js    # 消息模型
│   │   │   └── User.js       # 用户模型
│   │   ├── routes/           # 路由
│   │   │   ├── api/          # API 路由
│   │   │   │   ├── messages.js    # 消息接口
│   │   │   │   ├── users.js      # 用户接口
│   │   │   │   └── index.js      # API 路由入口
│   │   │   ├── facebookAuth.js   # Facebook 认证路由
│   │   │   ├── googleAuth.js     # Google 认证路由
│   │   │   ├── localAuth.js      # 本地认证路由
│   │   │   └── index.js          # 路由入口
│   │   ├── services/         # 服务层
│   │   │   ├── facebookStrategy.js   # Facebook 认证策略
│   │   │   ├── googleStrategy.js     # Google 认证策略
│   │   │   ├── jwtStrategy.js        # JWT 认证策略
│   │   │   ├── localStrategy.js      # 本地认证策略
│   │   │   └── validators.js         # 验证器
│   │   ├── utils/            # 工具函数
│   │   │   ├── constants.js  # 常量定义
│   │   │   ├── seed.js       # 数据库初始化数据
│   │   │   └── utils.js      # 通用工具函数
│   │   └── index.js          # 服务器入口
│   ├── .babelrc              # Babel 配置
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
- 用户可编辑自己的资料
- 管理员可编辑任意用户资料
- 支持头像上传
- 支持删除用户账号
- 需要登录才能访问

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
| GET | `/api/messages` | 获取所有消息列表 | 公开 |
| GET | `/api/messages/:id` | 获取单条消息 | 公开 |
| POST | `/api/messages` | 创建新消息 | 登录用户 |
| PUT | `/api/messages/:id` | 更新消息 | 本人或管理员 |
| DELETE | `/api/messages/:id` | 删除消息 | 本人或管理员 |

## 角色权限

### USER 角色
- 查看首页消息
- 发布新消息
- 编辑和删除自己的消息
- 查看用户列表
- 查看个人资料
- 编辑和删除自己的账号

### ADMIN 角色
- 拥有 USER 角色的所有权限
- 编辑和删除任意用户的消息
- 编辑和删除任意用户账号
- 访问管理员专属页面

## 启动方式

### 开发环境

#### 1. 克隆项目

```bash
git clone https://github.com/nemanjam/mern-boilerplate.git
cd mern-boilerplate
```

#### 2. 配置环境变量

**服务端配置**

复制 `server/.env.example` 为 `server/.env`，填写以下配置：

```env
# 数据库连接
MONGO_URI_DEV=mongodb://localhost:27017/mernboilerplate
MONGO_URI_PROD=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=/auth/google/callback

# Facebook OAuth
FACEBOOK_APP_ID=
FACEBOOK_SECRET=
FACEBOOK_CALLBACK_URL=/auth/facebook/callback

# JWT 密钥
JWT_SECRET_DEV=secret
JWT_SECRET_PROD=

# 站点 URL
CLIENT_URL_DEV=https://localhost:3000
CLIENT_URL_PROD=
SERVER_URL_DEV=https://localhost:5000
SERVER_URL_PROD=

# 图片存储路径
IMAGES_FOLDER_PATH=/public/images/
```

**客户端配置**

复制 `client/.env.example` 为 `client/.env`，填写以下配置：

```env
REACT_APP_BASE_URL=https://localhost:5000
```

#### 3. 生成 SSL 证书

Facebook OAuth 需要 HTTPS，需生成证书：

```bash
cd server/security
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256
```

#### 4. 安装依赖

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

#### 5. 启动服务

**方式一：分别启动**

启动服务端：

```bash
cd server
npm run server
```

启动客户端：

```bash
cd client
npm start
```

**方式二：同时启动**

在服务端目录执行：

```bash
cd server
npm run dev
```

### 访问地址

- 客户端：`https://localhost:3000`
- 服务端：`https://localhost:5000`

## Docker 部署

项目支持 Docker 部署，使用 `docker-compose.yml` 配置。

```bash
docker-compose up
```

## 数据库初始化

项目启动时会自动执行 `seed.js`，初始化示例用户和消息数据。可通过访问 `/api/users/reseed` 重新初始化数据库。

## 功能特点

- ✅ 完整的用户认证系统（本地认证 + Google/Facebook OAuth）
- ✅ JWT 保护的 API 接口
- ✅ 用户角色权限管理（USER/ADMIN）
- ✅ 消息 CRUD 操作
- ✅ 用户资料管理（头像上传、资料编辑）
- ✅ 服务端和客户端表单验证
- ✅ 响应式设计
- ✅ 加载状态处理
- ✅ Docker 支持
- ✅ HTTPS 支持（开发环境）

## 许可证

MIT License