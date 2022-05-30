import { v4 as uuid } from '@lukeed/uuid/secure';
import { connect, User, Event } from '../../../models';

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export default async function handler(req, res) {
  const { id: user_id } = req.query;
  await connect();

  const user = await User.findOne({
    user_id,
  });

  // return not found
  if (!user) return res
    .status(422)
    .json({ ok: false, msg: 'id not found' });

  if (req.method == 'POST') {
    const { name: event_name, start_date, end_date } = req.body;

    // validate name
    if (!event_name) return res
      .status(422)
      .json({ ok: false, msg: 'name cant emty' });

    // validate start date
    if (!start_date) return res
      .status(422)
      .json({ ok: false, msg: 'Start date cant emty' });

    // validate end date
    if (!end_date) return res
      .status(422)
      .json({ ok: false, msg: 'End date cant emty' });

    const event_id = uuid();
    await Event.create({
      userId: user._id,
      event_id,
      event_name,
      start_date,
      end_date,
    });

    res.status(200).json({
      ok: true,
      msg: 'event created',
      data: {
        event_id,
      }
    });
  } else if (req.method == "GET") {
    const data = await Event.find({
      userId: user._id,
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
