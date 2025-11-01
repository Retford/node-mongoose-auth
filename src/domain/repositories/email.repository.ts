import { SendMailOptions } from '../../infraestructure/repositories/email.repository.impl';

export abstract class EmailRepository {
  abstract sendEmail(options: SendMailOptions): Promise<boolean>;
  abstract validateEmail(token: string): Promise<boolean>;
}
