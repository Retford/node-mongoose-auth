import { EmailDatasource } from '../../domain/datasources/email.datasource';
import { EmailRepository } from '../../domain/repositories/email.repository';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailRepositoryImpl implements EmailRepository {
  constructor(private readonly emailDatasource: EmailDatasource) {}
  validateEmail(token: string): Promise<boolean> {
    return this.emailDatasource.validateEmail(token);
  }

  sendEmail(options: SendMailOptions): Promise<boolean> {
    return this.emailDatasource.sendEmail(options);
  }
}
