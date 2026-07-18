import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 2000,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true },
);

commentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const validateComment = (comment) => {
  const schema = Joi.object({
    content: Joi.string().min(5).max(2000).required(),
    post: Joi.string().required(),
  });
  return schema.validate(comment);
};

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;