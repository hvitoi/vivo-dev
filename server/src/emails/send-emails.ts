import sgMail from '@sendgrid/mail';

const sendEmail = (email: string, subject: string, text: string) => {
  if (process.env.NODE_ENV === 'test') return Promise.resolve();
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail.send({
      from: process.env.SENDGRID_EMAIL,
      to: email,
      subject,
      text
    });
  } catch (err) {
    throw new Error(err);
  }
};

const sendEmailFrontend = (email: string) => {
  const subject = 'Obrigado por se candidatar';
  const text =
    'Obrigado por ser candidatar, assim que tivermos uma vaga disponível para programador Front-End entraremos em contato';
  console.log('E-mail enviado para programador Front-End.');
  return sendEmail(email, subject, text);
};

const sendEmailBackend = (email: string) => {
  const subject = 'Obrigado por se candidatar';
  const text =
    ' Obrigado por ser candidatar, assim que tivermos uma vaga disponível para programador Back-End entraremos em contato.';
  console.log('E-mail enviado para programador Back-End.');
  return sendEmail(email, subject, text);
};

const sendEmailMobile = (email: string) => {
  const subject = 'Obrigado por se candidatar';
  const text =
    'Obrigado por ser candidatar, assim que tivermos uma vaga disponível para programador Mobile entraremos em contato.';
  console.log('E-mail enviado para programador Mobile.');
  return sendEmail(email, subject, text);
};

const sendEmailGeneric = (email: string) => {
  const subject = 'Obrigado por se candidatar';
  const text =
    'Obrigado por ser candidatar, assim que tivermos uma vaga disponível para programador entraremos em contato.';
  console.log('E-mail enviado para programador.');
  return sendEmail(email, subject, text);
};

export {
  sendEmailFrontend,
  sendEmailBackend,
  sendEmailMobile,
  sendEmailGeneric
};
