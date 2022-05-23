const mongoose = require('mongoose');
const InvitationList = require('./InvitationList');
const ListReferalLink = require('./ListReferalLink');
const Setting = require('./Setting');
const UserBalance = require('./UserBalance');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = {
  connect,
  InvitationList,
  ListReferalLink,
  UserBalance,
  Setting,
}