import { EmailRepository } from '../../repositories/email.repository';

export interface EmailUseCase {
  execute(token: string): Promise<boolean>;
}

export class ValidateEmail implements EmailUseCase {
  constructor(private readonly emailRepository: EmailRepository) {}

  execute(token: string): Promise<boolean> {
    return this.emailRepository.validateEmail(token);
  }
}
