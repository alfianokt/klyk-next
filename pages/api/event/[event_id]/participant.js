import { v4 as uuid } from '@lukeed/uuid/secure';
import dayjs from 'dayjs';
import { models } from 'mongoose';
import { connect } from '../../../../models';

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export default async function handler(req, res) {
  const { event_id } = req.query;
  await connect();

  const event_data = await models.Event.findOne({
    event_id,
  });

  // return not found
  if (!event_data) return res
    .status(422)
    .json({ ok: false, msg: 'id not found' });

  // event has ended
  if (dayjs().unix() > dayjs(event_data.end_date).unix()) return res
    .status(422)
    .json({ ok: false, msg: 'event has ended' });

  if (req.method == 'POST') {
    const { name: user_name, address, phone, email } = req.body;

    // validate name
    if (!user_name) return res
      .status(422)
      .json({ ok: false, msg: 'name cant emty' });

    // validate address
    if (!address) return res
      .status(422)
      .json({ ok: false, msg: 'Address cant emty' });

    // validate phone
    if (!phone) return res
      .status(422)
      .json({ ok: false, msg: 'Phone date cant emty' });

    // validate email
    if (!email) return res
      .status(422)
      .json({ ok: false, msg: 'Start date cant emty' });

    const data_exists = await models.Participant.findOne({
      eventId: event_data._id,
      $or: [
        { phone },
        { email },
      ]
    });

    // return not found
    if (data_exists) return res
      .status(422)
      .json({ ok: false, msg: 'email or phone already submited' });

    const participant_id = uuid();
    await models.Participant.create({
      eventId: event_data._id,
      participant_id,
      name: user_name,
      address,
      phone,
      email,
    });

    res.status(200).json({
      ok: true,
      msg: 'Success joined',
      data: {
        participant_id,
      }
    });
  } else if (req.method == "GET") {
    const data = await models.Participant.find({
      eventId: event_data._id,
    });

    res.status(200).json({
      ok: true,
      msg: 'event data',
      data,
    });
  } else {
    res.status(404).json({ ok: false, msg: 'not found' });
  }
}
