import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL,
  httpCredentials: {
    username: process.env.HTTP_USER,
    password: process.env.HTTP_PASSWORD,
  },
};