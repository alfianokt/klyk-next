/**
 * add user
 *
 * for development only
 * please delete on production
 */

import { v4 as uuid } from '@lukeed/uuid/secure';
import { connect, User } from '../../models';
import { users } from '../../lib/users';

/**
 *
 * @param {} req
 * @param {*} res
 */
export default async function handler(req, res) {
  await connect();

  if (req.method == 'POST') {
    const randomUser = () => users[Math.floor(Math.random() * users.length)];
    const user = await User.create({
      user_id: uuid(),
      name: req.query.name || randomUser(),
      total_point: 0,
    });

    res.status(200).json({ ok: true, msg: 'oke', data: { id: user._id } });
  } else if (req.method == 'GET') {
    const data = await User.find().select('-__v');
    res.status(200).json({ ok: true, msg: 'oke', data });
  } else {
    res.status(404).json({ ok: false, msg: 'not found' });
  }
}
