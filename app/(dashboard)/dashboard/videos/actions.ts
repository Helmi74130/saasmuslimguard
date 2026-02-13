'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { videoCategories, videos } from '@/lib/db/schema';
import { validatedActionWithUser } from '@/lib/auth/middleware';

// ===== HELPERS =====

const zBool = z.string().transform((v) => v === 'true');

function requireAdmin(role: string) {
  if (role !== 'admin') {
    throw new Error('Accès non autorisé');
  }
}

function extractYoutubeId(input: string): string {
  // Accepte un ID direct ou une URL YouTube
  const match = input.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : input.trim();
}

// ===== CATÉGORIES =====

const addCategorySchema = z.object({
  name: z.string().min(1, 'Nom requis').max(100),
  icon: z.string().min(1, 'Icône requise').max(50),
  order: z.coerce.number().int().default(0),
});

export const addCategory = validatedActionWithUser(
  addCategorySchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    await db.insert(videoCategories).values(data);
    return { success: 'Catégorie ajoutée' };
  }
);

const updateCategorySchema = z.object({
  id: z.coerce.number().int(),
  name: z.string().min(1, 'Nom requis').max(100),
  icon: z.string().min(1, 'Icône requise').max(50),
  order: z.coerce.number().int().default(0),
});

export const updateCategory = validatedActionWithUser(
  updateCategorySchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    const { id, ...values } = data;
    await db.update(videoCategories).set(values).where(eq(videoCategories.id, id));
    return { success: 'Catégorie mise à jour' };
  }
);

const deleteCategorySchema = z.object({
  id: z.coerce.number().int(),
});

export const deleteCategory = validatedActionWithUser(
  deleteCategorySchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    await db.delete(videoCategories).where(eq(videoCategories.id, data.id));
    return { success: 'Catégorie supprimée' };
  }
);

const toggleCategoryActiveSchema = z.object({
  id: z.coerce.number().int(),
  active: zBool,
});

export const toggleCategoryActive = validatedActionWithUser(
  toggleCategoryActiveSchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    await db
      .update(videoCategories)
      .set({ active: data.active })
      .where(eq(videoCategories.id, data.id));
    return { success: data.active ? 'Catégorie activée' : 'Catégorie désactivée' };
  }
);

// ===== VIDÉOS =====

const addVideoSchema = z.object({
  youtubeUrl: z.string().min(1, 'Lien YouTube requis'),
  title: z.string().min(1, 'Titre requis').max(255),
  categoryId: z.coerce.number().int(),
  hasSound: zBool.default('true'),
  order: z.coerce.number().int().default(0),
  thumbnailUrl: z.string().optional(),
});

export const addVideo = validatedActionWithUser(
  addVideoSchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    const youtubeId = extractYoutubeId(data.youtubeUrl);
    if (!youtubeId || youtubeId.length > 20) {
      return { error: 'ID YouTube invalide' };
    }
    await db.insert(videos).values({
      youtubeId,
      title: data.title,
      categoryId: data.categoryId,
      hasSound: data.hasSound,
      order: data.order,
      thumbnailUrl: data.thumbnailUrl || null,
    });
    return { success: 'Vidéo ajoutée' };
  }
);

const updateVideoSchema = z.object({
  id: z.coerce.number().int(),
  title: z.string().min(1, 'Titre requis').max(255),
  categoryId: z.coerce.number().int(),
  hasSound: zBool.default('true'),
  order: z.coerce.number().int().default(0),
  thumbnailUrl: z.string().optional(),
});

export const updateVideo = validatedActionWithUser(
  updateVideoSchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    const { id, ...values } = data;
    await db
      .update(videos)
      .set({ ...values, thumbnailUrl: values.thumbnailUrl || null })
      .where(eq(videos.id, id));
    return { success: 'Vidéo mise à jour' };
  }
);

const deleteVideoSchema = z.object({
  id: z.coerce.number().int(),
});

export const deleteVideo = validatedActionWithUser(
  deleteVideoSchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    await db.delete(videos).where(eq(videos.id, data.id));
    return { success: 'Vidéo supprimée' };
  }
);

const toggleVideoActiveSchema = z.object({
  id: z.coerce.number().int(),
  active: zBool,
});

export const toggleVideoActive = validatedActionWithUser(
  toggleVideoActiveSchema,
  async (data, _, user) => {
    requireAdmin(user.role);
    await db
      .update(videos)
      .set({ active: data.active })
      .where(eq(videos.id, data.id));
    return { success: data.active ? 'Vidéo activée' : 'Vidéo désactivée' };
  }
);
