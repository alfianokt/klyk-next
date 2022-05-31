import { v4 as uuid } from '@lukeed/uuid/secure';
import isDate from 'validator/lib/isDate';
import { models } from 'mongoose';
import { connect } from '../../../models';

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
export default async function handler(req, res) {
  const { id: user_id } = req.query;
  await connect();

  const user = await models.User.findOne({
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
      .json({ ok: false, msg: 'Name cant emty' });

    // validate start date
    if (!start_date) return res
      .status(422)
      .json({ ok: false, msg: 'Start date cant emty' });
    if (!isDate(start_date)) return res
      .status(422)
      .json({ ok: false, msg: 'Start date format is invalid' });

    // validate end date
    if (!end_date) return res
      .status(422)
      .json({ ok: false, msg: 'End date cant emty' });
    if (!isDate(end_date)) return res
      .status(422)
      .json({ ok: false, msg: 'End date format is invalid' });

    const event_id = uuid();
    await models.Event.create({
      userId: user._id,
      event_id,
      event_name,
      start_date,
      end_date,
    });

    res.status(200).json({
      ok: true,
      msg: 'Event created',
      data: {
        event_id,
      }
    });
  } else if (req.method == "GET") {
    const data = await models.Event.find({
      userId: user._id,
    });

    res.status(200).json({
      ok: true,
      msg: 'Event data',
      data,
    });
  } else {
    res.status(404).json({ ok: false, msg: 'not found' });
  }
}
