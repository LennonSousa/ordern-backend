import nodemailer from 'nodemailer';

const { host, port, user, pass } = require('../config/mail');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass
    }
});

export default transport;