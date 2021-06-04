import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { MailerService } from './services/mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('mail_send')
  mailSend() {
    console.log(this.mailerService.sendMail());
  }
}
