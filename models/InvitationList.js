const { model } = require("mongoose");

const InvitationList = model('InvitationList', {
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
    enum: [0, 1, 2]
  },
  user_id: {
    type: String,
    required: true,
  },
  id_referal: {
    type: String,
    required: true,
  },
}, 'invitation_list');

module.exports = InvitationList;
