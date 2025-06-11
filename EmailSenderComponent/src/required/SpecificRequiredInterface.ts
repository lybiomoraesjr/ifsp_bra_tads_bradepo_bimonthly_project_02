export interface SpecificRequiredInterface {
    configureSMTP(smtp: { host: string; port: number; user: string; pass: string }): void;
    send(mail: {
      to: string;
      subject: string;
      html: string;
      attachments?: Array<{
        filename: string;
        content?: Buffer;
        path?: string;
        contentType?: string;
      }>;
    }): Promise<void>;
  }