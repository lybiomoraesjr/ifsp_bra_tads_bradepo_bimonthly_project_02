import dotenv from 'dotenv';
import { ConcreteComponentInterface } from './componentInterface/ConcreteComponentInterface';
import fs from 'fs';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

(async () => {
  const component = new ConcreteComponentInterface();

  component.init();
  component.configureSMTP({
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  });

  // Exemplo de anexos
  const attachments = [
    // Anexo 1: Arquivo do sistema de arquivos
    {
      filename: 'documento.pdf',
      path: './src/templates/base.hbs', // Usando um arquivo existente como exemplo
      contentType: 'application/pdf'
    },
    // Anexo 2: Conteúdo em buffer (exemplo de texto)
    {
      filename: 'relatorio.txt',
      content: Buffer.from('Este é um relatório de exemplo\nGerado em: ' + new Date().toISOString()),
      contentType: 'text/plain'
    }
  ];

  await component.sendEmail({
    to: 'destinatario@exemplo.com',
    subject: 'Teste de envio com anexos',
    templateData: { nome: 'Lybio' },
    attachments: attachments
  });

  console.log('Email enviado com sucesso!');
})();

