require('dotenv/config');
import nodemailer from 'nodemailer';

const { host, port, user, pass } = require('../config/mail');

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST ? process.env.EMAIL_HOST : host,
    port: process.env.EMAIL_PORT ? process.env.EMAIL_PORT : port,
    auth: {
        user: process.env.EMAIL_USER ? process.env.EMAIL_USER : user,
        pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS : pass
    }
});

export default transport;