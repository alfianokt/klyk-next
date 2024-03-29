import { v4 as uuid } from '@lukeed/uuid/secure';
import { connect, User, ListReferalLink, InvitationList } from '../../../models';
import dayjs from 'dayjs';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { sendEmail } from '../../../lib/email';

const { INVITE_LIMIT = 3 } = process.env;

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export default async function handler(req, res) {
  await connect();

  if (req.method == 'POST') {
    const { id: user_id } = req.query;
    const email_address = req.body.email || null;

    const user = await User.findOne({
      user_id,
    });

    // return not found
    if (!user) return res
      .status(422)
      .json({ ok: false, msg: 'not found' });

    // email cant emty
    if (!email_address) return res
      .status(422)
      .json({ ok: false, msg: 'email cant null' });
    if (!isEmail(email_address)) return res
      .status(422)
      .json({ ok: false, msg: 'Wrong email format' });
    if (!isLength(email_address, { min: 4, max: 50 })) return res
      .status(422)
      .json({ ok: false, msg: 'Name length minimal 4 and max 50' });

    // check are already invited
    const invitation_list = await InvitationList.findOne({
      userId: user._id,
      email_address,
    });

    // already invited
    if (invitation_list) {
      return res
        .status(422)
        .json({ ok: false, msg: 'Sorry, the email you input have already submitted 😔' })
    };

    // count list referal link
    const count_list_referal_link = await ListReferalLink
      .find({
        userId: user._id,
        // filter date for 1 day
        createdAt: {
          $lt: dayjs(),
          $gte: dayjs().subtract(1, 'd'),
        },
      })
      .count();

    // invitation limit
    if (count_list_referal_link >= INVITE_LIMIT) {
      return res
        .status(422)
        .json({ ok: false, msg: 'The invitations you sent have exceeded the daily limit 😔' });
    }

    const referal_id = uuid();
    const referal_link = `/register/${referal_id}`;
    const insert_list = await ListReferalLink
      .create({
        referal_id,
        userId: user._id,
        referal_link,
      });
    const insert_invitation = await InvitationList
      .create({
        referalId: insert_list._id,
        email_address,
        status_invitation: 0,
      });

    // sending email
    const body = `
      <h1>Hello, ${email_address}</h1>
      <p>You invited by ${user.name}</p>
      <a href="${process.env.BASE_URL}${referal_link}">Click here to view</a>
    `.trim();
    const send_email_status = await sendEmail(email_address, "Your friend invite you", body)
      .then((r) => {
        // handle success when sending email
      })
      .catch(err => {
        // handle failed when sending email
      });

    res.status(200).json({ ok: true, msg: 'Thank you for inviting your friend 🎉', data: { referal_link } });
  } else {
    res.status(404).json({ ok: false, msg: 'not found' });
  }
}
