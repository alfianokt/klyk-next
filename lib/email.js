import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, body) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    });

    const data = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: subject,
      html: body,
    }

    transporter.sendMail(data, (err, info) => {
      if (err) {
        reject({
          ok: false,
          msg: err,
        });
      } else {
        resolve({
          ok: true,
          msg: info,
        });
      }
    });
  });
}
