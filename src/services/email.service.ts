import nodemailer, { Transporter } from "nodemailer";

// import HbsTransporter from "nodemailer-express-handlebars";
import { configs } from "../configs/config";

class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "email",
      auth: {
        user: configs.SMTP_EMAIL,
        pass: configs.SMTP_PASSWORD,
      },
    });
  }
  public async sendMail(to: string): Promise<void> {
    await this.transporter.sendMail({
      to,
      subject: "Hello I",
      text: "I am created you",
    });
  }
}
export const emailService = new EmailService();
