import express from 'express';
import validator from 'validator';
import { Request, Response } from 'express'; // types
import {
  sendEmailFrontend,
  sendEmailBackend,
  sendEmailMobile,
  sendEmailGeneric
} from '../emails/send-emails'; // email

const router = express.Router();

interface DeveloperProps {
  name: string;
  email: string;
  html?: number;
  css?: number;
  js?: number;
  python?: number;
  django?: number;
  ios?: number;
  android?: number;
}

enum DevTypes {
  Frontend = 'frontend',
  Backend = 'backend',
  Mobile = 'mobile',
  Generic = 'generic'
}

router.post('/api', async (req: Request, res: Response) => {
  const form = req.body as DeveloperProps;
  const { name, email } = form;
  if (!name || !email) throw new Error();
  if (!validator.isEmail(email)) throw new Error();

  // Lógica de envio de emails
  const emailHandlers: ((email: string) => void)[] = [];
  const devTypes: string[] = [];

  if (form.html >= 7 && form.css >= 7 && form.js >= 7) {
    emailHandlers.push(sendEmailFrontend);
    devTypes.push(DevTypes.Frontend);
  }

  if (form.python >= 7 && form.django >= 7) {
    emailHandlers.push(sendEmailBackend);
    devTypes.push(DevTypes.Backend);
  }
  if (form.ios >= 7 && form.android >= 7) {
    emailHandlers.push(sendEmailMobile);
    devTypes.push(DevTypes.Mobile);
  }
  if (emailHandlers.length === 0) {
    emailHandlers.push(sendEmailGeneric);
    devTypes.push(DevTypes.Generic);
  }

  // Envia todos emails
  ///for (let emailHandler of emailHandlers) emailHandler(email);
  await Promise.all(emailHandlers.map((handler) => handler(email)));

  res.status(200).send({ devTypes });
});

export { router as api };
