import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import { getYear } from 'date-fns';

require('dotenv/config');

class Mailer {
    private client: Transporter;

    constructor() {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        this.client = transporter;
    }

    private async execute(to: string, subject: string, variables: object, hbsTemplatePath: string, text: string) {
        //const resetUserPasswordPath = resolve(__dirname, "..", "views", "emails", "reset.hbs");

        const hbsTemplate = fs.readFileSync(hbsTemplatePath).toString("utf-8");

        const mailTemplateParse = handlebars.compile(hbsTemplate);

        const html = mailTemplateParse(variables);

        await this.client.sendMail({
            to,
            subject,
            html,
            text,
            from: `${process.env.STORE_NAME} lennonsousa@outlook.com`,
        });
    }

    async sendNewUserEmail(email: string, token: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            token,
            current_year: getYear(new Date()),
        }

        const newCustomerPath = resolve(__dirname, "..", "views", "emails", "newCustomer.hbs");

        const text = `Bem-vindo a ${process.env.STORE_NAME}.
        Para confirmar o seu e-mail,
        digite no aplicativo o código a seguir:
        ${token}`;

        await this.execute(email, "Bem-vindo(a).", variables, newCustomerPath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send new user e-mail: ', err);
            return false
        });
    }

    async sendConfirmedUserEmail(name: string, email: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            name,
            current_year: getYear(new Date()),
        }

        const newCustomerPath = resolve(__dirname, "..", "views", "emails", "confirmedCustomer.hbs");

        const text = `Olá ${name},
        O seu cadastro no aplicativo foi concluído com sucesso!
        Aproveite para fazer a sua primeira compra no aplicativo.
        Estamos aguardando você!`;

        await this.execute(email, "Cadastro concluído!", variables, newCustomerPath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send confirmed user e-mail: ', err);
            return false
        });
    }

    async sendResetUserEmail(name: string, email: string, token: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            name,
            token,
            current_year: getYear(new Date()),
        }

        const newCustomerPath = resolve(__dirname, "..", "views", "emails", "resetCustomer.hbs");

        const text = `Olá ${name},
        Recebemos a sua solicitação para trocar a sua senha,
        para prosseguir, digite no aplicativo o código a seguir:
        ${token}
        Caso não tenha sido você que solicitou a troca da sua senha, ignore este e-mail.`;

        await this.execute(email, "Recuperação de senha.", variables, newCustomerPath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send reset user e-mail: ', err);
            return false
        });
    }
}

export default new Mailer();