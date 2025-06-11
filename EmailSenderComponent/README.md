# Email Sender Component

A flexible and extensible email sending component built with TypeScript, supporting SMTP, templates, and attachments.

## Features

- ✅ **SMTP Support**: Configure any SMTP server
- ✅ **Template Engine**: Handlebars templates with dynamic data
- ✅ **File Attachments**: Support for multiple file types
- ✅ **TypeScript**: Full type safety and IntelliSense
- ✅ **Flexible Architecture**: Component-based design for extensibility
- ✅ **Environment Variables**: Easy configuration with .env files

## Installation

```bash
npm install @lybio/email-sender-component
```

## Quick Start

### Basic Usage

```typescript
import { EmailSender } from '@lybio/email-sender-component';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const emailSender = new EmailSender();

// Initialize and configure
emailSender.init();
emailSender.configureFromEnv(); // Uses SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

// Send email
await emailSender.sendEmail({
  to: 'recipient@example.com',
  subject: 'Hello World',
  body: '<h1>Hello!</h1><p>This is a test email.</p>'
});
```

### With Templates

```typescript
import { EmailSender } from '@lybio/email-sender-component';

const emailSender = new EmailSender();
emailSender.init();
emailSender.configureFromEnv();

// Send email with template
await emailSender.sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  templateName: 'welcome',
  templateData: {
    name: 'John Doe',
    company: 'Acme Corp'
  }
});
```

### With Attachments

```typescript
import { EmailSender } from '@lybio/email-sender-component';

const emailSender = new EmailSender();
emailSender.init();
emailSender.configureFromEnv();

// Send email with attachments
await emailSender.sendEmail({
  to: 'recipient@example.com',
  subject: 'Report with attachments',
  body: 'Please find the attached files.',
  attachments: [
    {
      filename: 'report.pdf',
      path: './reports/monthly-report.pdf',
      contentType: 'application/pdf'
    },
    {
      filename: 'data.txt',
      content: Buffer.from('Some data content'),
      contentType: 'text/plain'
    }
  ]
});
```

### Manual SMTP Configuration

```typescript
import { EmailSender } from '@lybio/email-sender-component';

const emailSender = new EmailSender();
emailSender.init();

emailSender.configureSMTP({
  host: 'smtp.gmail.com',
  port: 587,
  user: 'your-email@gmail.com',
  pass: 'your-app-password'
});

await emailSender.sendEmail({
  to: 'recipient@example.com',
  subject: 'Test Email',
  body: 'Hello from Gmail SMTP!'
});
```

## Environment Variables

Create a `.env` file in your project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Advanced Usage

### Using the Component Architecture

```typescript
import { 
  ConcreteComponentInterface, 
  ConcreteNonComponentPortOutbox,
  EmailService 
} from '@lybio/email-sender-component';

// Create custom implementation
const smtpClient = new ConcreteNonComponentPortOutbox();
smtpClient.configureSMTP({
  host: 'smtp.example.com',
  port: 587,
  user: 'user@example.com',
  pass: 'password'
});

const emailService = new EmailService(smtpClient);
const component = new ConcreteComponentInterface();

component.init();
component.configureSMTP({
  host: 'smtp.example.com',
  port: 587,
  user: 'user@example.com',
  pass: 'password'
});

await component.sendEmail({
  to: 'recipient@example.com',
  subject: 'Custom Implementation',
  body: 'This uses the component architecture directly.'
});
```

### Custom Templates

Create your own Handlebars templates in the `templates` directory:

```handlebars
<!-- templates/welcome.hbs -->
<!DOCTYPE html>
<html>
<head>
    <title>Welcome {{name}}!</title>
</head>
<body>
    <h1>Welcome to {{company}}, {{name}}!</h1>
    <p>We're excited to have you on board.</p>
    <p>Your account has been created successfully.</p>
</body>
</html>
```

## API Reference

### EmailSender Class

#### Methods

- `init()`: Initialize the component
- `configureSMTP(config: SMTPConfig)`: Configure SMTP settings
- `configureFromEnv(prefix?: string)`: Configure from environment variables
- `sendEmail(data: EmailData)`: Send an email

### Types

```typescript
interface SMTPConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

interface EmailData {
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
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/lybio/email-sender-component/issues) on GitHub. 