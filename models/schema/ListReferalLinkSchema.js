const { Types, Schema } = require("mongoose");

const ListReferalSchema = new Schema({
  referal_id: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'users',
    required: true,
  },
  referal_link: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = ListReferalSchema;
