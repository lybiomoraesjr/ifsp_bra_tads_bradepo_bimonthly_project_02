import { SpecificRequiredInterface } from '../required/SpecificRequiredInterface';
import nodemailer from 'nodemailer';

export class ConcreteNonComponentPortOutbox implements SpecificRequiredInterface {
  private transporter!: nodemailer.Transporter;

  configureSMTP(smtp: { host: string; port: number; user: string; pass: string }) {
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: { user: smtp.user, pass: smtp.pass },
    });
  }

  async send({ to, subject, html, attachments }: any) {
    await this.transporter.sendMail({
      from: '"No-Reply" <noreply@example.com>',
      to,
      subject,
      html,
      attachments,
    });
  }
}