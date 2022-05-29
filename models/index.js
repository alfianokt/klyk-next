const mongoose = require('mongoose');
const { model, models } = require("mongoose");
const ListReferalSchema = require('./schema/ListReferalLinkSchema');
const InvitationListSchema = require('./schema/InvitationListSchema');
const SettingSchema = require('./schema/SettingSchema');
const UserSchema = require('./schema/UserSchema');
const EventSchema = require('./schema/EventSchema');
const ParticipantSchema = require('./schema/ParticipantSchema');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
}
const ListReferalLink = models.ListReferalLink || model("ListReferalLink", ListReferalSchema, 'list_referal_link');
const InvitationList = models.InvitationList || model("InvitationList", InvitationListSchema, 'invitation_list');
const Setting = models.Setting || model("Setting", SettingSchema, 'settings');
const User = models.User || model("User", UserSchema, 'users');
const Event = models.Event || model("Event", EventSchema, 'events');
const Participant = models.Participant || model("Participant", ParticipantSchema, 'participants');

module.exports = {
  connect,
  ListReferalLink,
  InvitationList,
  Setting,
  User,
  Event,
  Participant,
}