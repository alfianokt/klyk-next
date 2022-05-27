const mongoose = require('mongoose');
const { model, models } = require("mongoose");
const ListReferalSchema = require('./schema/ListReferalLinkSchema');
const InvitationListSchema = require('./schema/InvitationListSchema');
const SettingSchema = require('./schema/SettingSchema');
const UserSchema = require('./schema/UserSchema');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
}
const ListReferalLink = models.ListReferalLink || model("ListReferalLink", ListReferalSchema, 'list_referal_link');
const InvitationList = models.InvitationList || model("InvitationList", InvitationListSchema, 'invitation_list');
const Setting = models.Setting || model("Setting", SettingSchema, 'settings');
const User = models.User || model("User", UserSchema, 'users');

module.exports = {
  connect,
  ListReferalLink,
  InvitationList,
  Setting,
  User,
}