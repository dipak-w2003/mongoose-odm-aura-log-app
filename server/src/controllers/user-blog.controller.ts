import { Response } from "express";
import { IExtendedRequest } from "../middlware/index.type";
import { BlogModel, IBlog } from "../models/user-blog.model";

// Create Blog
export const createBlog = async (req: IExtendedRequest, res: Response) => {
  const createData: Partial<IBlog> = req.body;
  const userId = req.user?.id;

  const createdData = await BlogModel.create({
    ...createData,
    author: userId
  });

  res.status(201).json({
    message: "Blog created successfully",
    data: createdData
  });
};

// Get all blogs for a user
export const getBlogs = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const blogs = await BlogModel.find({ author: userId });

  if (blogs.length === 0) {
    return res.status(404).json({ message: "No blogs found" });
  }

  res.status(200).json({
    message: "Blogs fetched successfully",
    data: blogs
  });
};

// Get single blog by slug (only published)
export const getBlogBySlug = async (req: IExtendedRequest, res: Response) => {
  const slug = req.params.slug;
  const blog = await BlogModel.findOne({ slug, isPublished: true });

  if (!blog) return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({
    message: "Blog fetched successfully",
    data: blog
  });
};

// Update Blog
export const updateBlog = async (req: IExtendedRequest, res: Response) => {
  const updatedBlog = await BlogModel.findOneAndUpdate(
    { _id: req.params.id, author: req.user?.id },
    req.body as IBlog,
    { new: true }
  );

  if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({
    message: "Blog updated successfully",
    data: updatedBlog
  });
};

// Delete Blog
export const deleteBlog = async (req: IExtendedRequest, res: Response) => {
  const deletedBlog = await BlogModel.findOneAndDelete({
    _id: req.params.id,
    author: req.user?.id
  });

  if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({
    message: "Blog deleted successfully",
    data: deletedBlog
  });
};
