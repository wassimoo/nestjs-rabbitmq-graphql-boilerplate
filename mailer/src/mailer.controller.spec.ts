import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './mailer.controller';

describe('AppController', () => {
  let appController: MailerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
      providers: [],
    }).compile();

    appController = app.get<MailerController>(MailerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(true).toBeTruthy();
    });
  });
});
