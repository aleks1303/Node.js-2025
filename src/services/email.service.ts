import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import HbsTransporter from "nodemailer-express-handlebars";

import { configs } from "../configs/config";
import { EmailConstant } from "../constants/email.constant";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailTypeToPayload } from "../types/email.type/email-type-to-payload.type";

class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      from: "No reply",
      auth: {
        user: configs.SMTP_EMAIL,
        pass: configs.SMTP_PASSWORD,
      },
    });
    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", HbsTransporter(hbsOptions));
  }
  public async sendMail<T extends EmailTypeEnum>(
    to: string,
    type: T,
    context: EmailTypeToPayload[T],
  ): Promise<void> {
    const { subject, template } = EmailConstant[type];
    const options = { to, subject, template, context };
    await this.transporter.sendMail(options);
  }
}
export const emailService = new EmailService();
