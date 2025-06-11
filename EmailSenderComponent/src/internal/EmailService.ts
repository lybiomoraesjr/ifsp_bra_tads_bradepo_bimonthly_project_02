import { SpecificRequiredInterface } from '../required/SpecificRequiredInterface';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export class EmailService {
  constructor(private smtpClient: SpecificRequiredInterface) {}

  async sendEmail(params: {
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
  }) {
    const html = params.body ?? await this.compileTemplate(params.templateName ?? 'base', params.templateData);
    
    // Processar anexos
    const processedAttachments = await this.processAttachments(params.attachments);
    
    await this.smtpClient.send({ 
      to: params.to, 
      subject: params.subject, 
      html, 
      attachments: processedAttachments 
    });
  }

  private async processAttachments(attachments?: Array<{
    filename: string;
    content?: Buffer;
    path?: string;
    contentType?: string;
  }>): Promise<Array<{
    filename: string;
    content?: Buffer;
    path?: string;
    contentType?: string;
  }>> {
    if (!attachments) return [];

    const processedAttachments = [];

    for (const attachment of attachments) {
      if (attachment.path && !attachment.content) {
        // Se tem path mas não tem content, ler o arquivo
        try {
          const content = fs.readFileSync(attachment.path);
          processedAttachments.push({
            filename: attachment.filename,
            content,
            contentType: attachment.contentType
          });
        } catch (error) {
          console.warn(`Erro ao ler arquivo anexo: ${attachment.path}`, error);
        }
      } else {
        // Se já tem content ou não tem path, usar como está
        processedAttachments.push(attachment);
      }
    }

    return processedAttachments;
  }

  private async compileTemplate(templateName: string, data?: Record<string, unknown>): Promise<string> {
    const templatePath = path.resolve(__dirname, '../templates', `${templateName}.hbs`);
    const content = fs.readFileSync(templatePath, 'utf-8');
    return handlebars.compile(content)(data ?? {});
  }
}