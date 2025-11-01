import { SendMailOptions } from '../../../infraestructure/repositories/email.repository.impl';
import { EmailRepository } from '../../repositories/email.repository';

export interface EmailUseCase {
  execute(options: SendMailOptions): Promise<boolean>;
}

export class SendEmail implements EmailUseCase {
  constructor(private readonly emailRepository: EmailRepository) {}

  execute(options: SendMailOptions): Promise<boolean> {
    return this.emailRepository.sendEmail(options);
  }
}
