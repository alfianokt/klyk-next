const { Schema, Types } = require("mongoose");

const InvitationListSchema = new Schema({
  referalId: {
    type: Types.ObjectId,
    ref: 'list_referal_link',
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  status_invitation: {
    type: Number,
    required: true,
    enum: [0, 1, 2],
    default: 0,
  },
}, { timestamps: true });

module.exports = InvitationListSchema;
