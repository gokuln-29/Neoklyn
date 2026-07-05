import { z } from "zod";

export const testimonialSchema = z.object({
  author: z.string().min(1).max(200),
  company: z.string().max(200).optional().nullable(),
  role: z.string().max(200).optional().nullable(),
  content: z.string().min(1).max(3000),
  avatar: z.string().max(500).optional().nullable(),
  rating: z.number().int().min(1).max(5).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const faqEntitySchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  categoryId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1).max(200),
  role: z.string().min(1).max(200),
  bio: z.string().max(3000).optional().nullable(),
  avatar: z.string().max(500).optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const serviceEntitySchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(3000).optional().nullable(),
  icon: z.string().max(10).optional().nullable(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  features: z.array(z.string().max(200)).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const caseStudyEntitySchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  client: z.string().min(1).max(200),
  description: z.string().max(5000).optional().nullable(),
  featuredImage: z.string().max(500).optional().nullable(),
  technologies: z.array(z.string().max(100)).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});
