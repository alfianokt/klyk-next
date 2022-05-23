const { model } = require("mongoose");

const UserBalance = model('UserBalance', {
  user_id: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  total_point: {
    type: Number,
    required: true,
  },
}, 'user_balance');

module.exports = UserBalance;
