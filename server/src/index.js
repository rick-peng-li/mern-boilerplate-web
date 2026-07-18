import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import https from 'https';
import { readFileSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import cors from 'cors';

import routes from './routes/index.js';
import { seedDb } from './utils/seed.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
import './services/jwtStrategy.js';
import './services/facebookStrategy.js';
import './services/googleStrategy.js';
import './services/localStrategy.js';

const isProduction = process.env.NODE_ENV === 'production';

const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

mongoose
  .connect(dbConnection)
  .then(async () => {
    console.log('MongoDB Connected...');
    await seedDb().catch((err) => console.error('Seed error:', err));
  })
  .catch((err) => console.log(err));

app.use('/', routes);
app.use('/public/images', express.static(join(__dirname, '../public/images')));

if (isProduction) {
  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;

  try {
    const httpsOptions = {
      key: readFileSync(resolve(__dirname, '../security/cert.key')),
      cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
    };
    const server = https.createServer(httpsOptions, app).listen(port, () => {
      console.log('https server running at ' + port);
    });
  } catch (err) {
    app.listen(port, () => console.log(`http server running at ${port}`));
  }
}