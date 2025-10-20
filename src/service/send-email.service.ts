
import nodemailer, { type Transporter } from 'nodemailer'

interface SendMailOptions {
    to: string,
    subject: string,
    html: string
}
export class SendEmail {
    private transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendMail({to, subject, html }: SendMailOptions) : Promise<void> {
        await this.transporter.sendMail({
            from: `"Gestion" <${process.env.MAIL_FROM_ADDRESS}>`,
            to: to,
            subject: subject,
            html: html

        })
    }


}