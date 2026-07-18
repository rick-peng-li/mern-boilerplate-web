import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 5000,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

messageSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const validateMessage = (message) => {
  const schema = Joi.object({
    text: Joi.string().min(5).max(5000).required(),
  });
  return schema.validate(message);
};

const Message = mongoose.model('Message', messageSchema);

export default Message;