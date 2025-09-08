import mongoose, { Document, Schema } from "mongoose";
export interface IBlog extends Document {
  author: mongoose.Types.ObjectId,
  title: string,
  slug: string,
  // mdx stored as string
  content: string,
  tags?: string[],
  coverImage?: string,
  isPublished: boolean,
  createdAt: Date,
  updatedAt: Date
}
const BlogSchema: Schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trime: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    // raw mdx code
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: ""
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete (ret as any).user; // never expose password
      return ret;
    }
  }
})

export const BlogModel = mongoose.model<IBlog>("Blog", BlogSchema)