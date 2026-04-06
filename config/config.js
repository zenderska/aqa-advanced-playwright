import dotenv from 'dotenv';

const env = process.env.ENV || 'qauto';
dotenv.config({ path: `.env.${env}` });

export const config = {
  baseUrl: process.env.BASE_URL,
  httpCredentials: {
    username: process.env.HTTP_USER,
    password: process.env.HTTP_PASSWORD,
  },
};