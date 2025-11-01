import nodemailer, { Transporter } from 'nodemailer';
import { EmailRepository } from '../../domain/repositories/email.repository';
import { SendMailOptions } from '../repositories/email.repository.impl';
import { JwtAdapter } from '../../config/jwt.adapter';
import { CustomError } from '../../domain/errors/custom.error';
import { UserModel } from '../../data/mongo/models/user.model';

export class EmailDatasourceImpl implements EmailRepository {
  private transporter: Transporter;

  constructor(
    private readonly mailerService: string,
    private readonly mailerEmail: string,
    private readonly senderEmailPassword: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: this.mailerService,
      auth: {
        user: this.mailerEmail,
        pass: this.senderEmailPassword,
      },
    });
  }
  validateEmail = async (token: string): Promise<boolean> => {
    const payload = await JwtAdapter.validateToken<{ email: string }>(token);
    if (!payload) throw CustomError.unauthorized('Invalid token');

    const { email } = payload;

    if (!email) throw CustomError.internalServer('Email not in token');

    const user = await UserModel.findOne({ email });

    if (!user) throw CustomError.internalServer('Email not exist');

    user.emailValidated = true;
    await user.save();

    return true;
  };

  sendEmail = async (options: SendMailOptions): Promise<boolean> => {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  };
}
