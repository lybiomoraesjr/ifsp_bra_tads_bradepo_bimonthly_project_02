export interface SpecificProvidedInterface {
    sendEmail(data: {
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
    }): Promise<void>;
  }