import { ComponentInterface } from './ComponentInterface';
import { EmailService } from '../internal/EmailService';
import { SpecificProvidedInterface } from '../provided/SpecificProvidedInterface';
import { ConcreteNonComponentPortOutbox } from '../required/ConcreteNonComponentPortOutbox';

export class ConcreteComponentInterface extends ComponentInterface implements SpecificProvidedInterface {
  private emailService!: EmailService;

  init() {
    // Este método será chamado sem parâmetros para corresponder à interface base
    // A configuração SMTP deve ser feita separadamente
  }

  configureSMTP(smtpConfig: {
    host: string;
    port: number;
    user: string;
    pass: string;
  }) {
    const smtp = new ConcreteNonComponentPortOutbox();
    smtp.configureSMTP(smtpConfig);
    this.emailService = new EmailService(smtp);
  }

  async sendEmail(data: Parameters<SpecificProvidedInterface["sendEmail"]>[0]) {
    await this.emailService.sendEmail(data);
  }
}