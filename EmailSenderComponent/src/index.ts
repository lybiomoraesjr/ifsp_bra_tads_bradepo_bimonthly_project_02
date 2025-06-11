// Exportar interfaces principais
export { ComponentInterface } from './componentInterface/ComponentInterface';
export { SpecificProvidedInterface } from './provided/SpecificProvidedInterface';
export { SpecificRequiredInterface } from './required/SpecificRequiredInterface';

// Exportar implementações concretas
import { ConcreteComponentInterface } from './componentInterface/ConcreteComponentInterface';
export { ConcreteComponentInterface } from './componentInterface/ConcreteComponentInterface';
export { ConcreteNonComponentPortOutbox } from './required/ConcreteNonComponentPortOutbox';

// Exportar serviços internos
export { EmailService } from './internal/EmailService';

// Exportar tipos úteis
export interface SMTPConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body?: string;
  attachments?: Array<{
    filename: string;
    content?: Buffer;
    path?: string;
    contentType?: string;
  }>;
  templateName?: string;
  templateData?: Record<string, unknown>;
}

// Exportar classe principal para uso fácil
export class EmailSender {
  private component: ConcreteComponentInterface;

  constructor() {
    this.component = new ConcreteComponentInterface();
  }

  /**
   * Inicializa o componente
   */
  init(): void {
    this.component.init();
  }

  /**
   * Configura o servidor SMTP
   * @param smtpConfig Configuração do servidor SMTP
   */
  configureSMTP(smtpConfig: SMTPConfig): void {
    this.component.configureSMTP(smtpConfig);
  }

  /**
   * Envia um email
   * @param emailData Dados do email a ser enviado
   */
  async sendEmail(emailData: EmailData): Promise<void> {
    await this.component.sendEmail(emailData);
  }

  /**
   * Método de conveniência para configuração rápida com variáveis de ambiente
   * @param envPrefix Prefixo das variáveis de ambiente (padrão: 'SMTP_')
   */
  configureFromEnv(envPrefix: string = 'SMTP_'): void {
    const config: SMTPConfig = {
      host: process.env[`${envPrefix}HOST`]!,
      port: parseInt(process.env[`${envPrefix}PORT`]!),
      user: process.env[`${envPrefix}USER`]!,
      pass: process.env[`${envPrefix}PASS`]!,
    };

    this.configureSMTP(config);
  }
}

// Exportar função de conveniência para uso rápido
export function createEmailSender(): EmailSender {
  return new EmailSender();
} 