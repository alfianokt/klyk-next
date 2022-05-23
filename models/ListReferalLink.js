const { model } = require("mongoose");

const ListReferalLink = model('ListReferalLink', {
  user_id: {
    type: String,
    required: true,
  },
  referal_link: {
    type: String,
    required: true,
  },
}, 'list_referal_link');

module.exports = ListReferalLink;
