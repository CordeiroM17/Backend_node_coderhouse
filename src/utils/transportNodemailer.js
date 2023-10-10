import nodemailer from 'nodemailer';
import { __dirname, entorno } from '../dirname.js';

export const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: entorno.GOOGLE_EMAIL,
    pass: entorno.GOOGLE_PASS,
  },
});
