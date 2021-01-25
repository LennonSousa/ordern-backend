require('dotenv/config');
import nodemailer from 'nodemailer';

const { host, port, user, pass } = require('../config/mail');

const transport = nodemailer.createTransport({
    host: process.env.HOST ? process.env.HOST : host,
    port: process.env.HOST_PORT ? process.env.HOST_PORT : port,
    auth: {
        user: process.env.USER ? process.env.USER : user,
        pass: process.env.PASS ? process.env.PASS : pass
    }
});

export default transport;