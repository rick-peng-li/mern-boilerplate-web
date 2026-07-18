import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 5000,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

postSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(200).required(),
    content: Joi.string().min(10).max(5000).required(),
  });
  return schema.validate(post);
};

const Post = mongoose.model('Post', postSchema);

export default Post;