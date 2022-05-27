import { v4 as uuid } from '@lukeed/uuid/secure';
import { connect, User, ListReferalLink, InvitationList } from '../../../models';
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

    // check are already invited
    const invitation_list = await InvitationList.findOne({
      userId: user._id,
      email_address,
    });

    // already invited
    if (invitation_list) return res
      .status(422)
      .json({ ok: false, msg: 'Sorry, the email you input have already submitted 😔' });

    // count list referal link
    // todo: maybe add date filter
    const count_list_referal_link = await ListReferalLink
      .find({
        userId: user._id,
      })
      .count();

    // invitation limit
    if (count_list_referal_link >= INVITE_LIMIT) {
      res
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

    res.status(200).json({ ok: true, msg: 'Thank you for inviting your friend 🎉', data: { referal_link } });
  } else {
    res.status(404).json({ ok: false, msg: 'not found' });
  }
}