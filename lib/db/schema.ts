import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  passwordResetToken: text('password_reset_token'),
  passwordResetTokenExpiresAt: timestamp('password_reset_token_expires_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
  // Google Play Billing
  googlePlayPurchaseToken: text('google_play_purchase_token'),
  googlePlayProductId: text('google_play_product_id'),
  googlePlayExpiresAt: timestamp('google_play_expires_at'),
  subscriptionSource: varchar('subscription_source', { length: 20 }), // 'stripe' | 'google_play' | null
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const extensionTokens = pgTable('extension_tokens', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  teamId: integer('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  deviceName: varchar('device_name', { length: 100 }),
  extensionVersion: varchar('extension_version', { length: 20 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastUsedAt: timestamp('last_used_at'),
  revokedAt: timestamp('revoked_at'),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
  extensionTokens: many(extensionTokens),
  mobileDevices: many(mobileDevices),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
  extensionTokens: many(extensionTokens),
  mobileDevices: many(mobileDevices),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const extensionTokensRelations = relations(extensionTokens, ({ one }) => ({
  team: one(teams, {
    fields: [extensionTokens.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [extensionTokens.userId],
    references: [users.id],
  }),
}));

export const mobileDevices = pgTable('mobile_devices', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  teamId: integer('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  deviceName: varchar('device_name', { length: 100 }),
  deviceId: varchar('device_id', { length: 255 }),
  platform: varchar('platform', { length: 20 }).default('android'),
  appVersion: varchar('app_version', { length: 20 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastUsedAt: timestamp('last_used_at').defaultNow(),
  revokedAt: timestamp('revoked_at'),
});

export const mobileDevicesRelations = relations(mobileDevices, ({ one }) => ({
  team: one(teams, {
    fields: [mobileDevices.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [mobileDevices.userId],
    references: [users.id],
  }),
}));

// ===== TABLES VIDÉOS POUR MUSLIMGUARD APP =====

export const videoCategories = pgTable('video_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  icon: varchar('icon', { length: 50 }).notNull(),
  order: integer('order').notNull().default(0),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  youtubeId: varchar('youtube_id', { length: 20 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  thumbnailUrl: text('thumbnail_url'),
  categoryId: integer('category_id')
    .notNull()
    .references(() => videoCategories.id, { onDelete: 'cascade' }),
  hasSound: boolean('has_sound').notNull().default(true),
  order: integer('order').notNull().default(0),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const videoCategoriesRelations = relations(videoCategories, ({ many }) => ({
  videos: many(videos),
}));

export const videosRelations = relations(videos, ({ one }) => ({
  category: one(videoCategories, {
    fields: [videos.categoryId],
    references: [videoCategories.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type ExtensionToken = typeof extensionTokens.$inferSelect;
export type NewExtensionToken = typeof extensionTokens.$inferInsert;
export type MobileDevice = typeof mobileDevices.$inferSelect;
export type NewMobileDevice = typeof mobileDevices.$inferInsert;
export type VideoCategory = typeof videoCategories.$inferSelect;
export type NewVideoCategory = typeof videoCategories.$inferInsert;
export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET',
  RESET_PASSWORD = 'RESET_PASSWORD',
  EXTENSION_REGISTERED = 'EXTENSION_REGISTERED',
  EXTENSION_LINKED = 'EXTENSION_LINKED',
  EXTENSION_REVOKED = 'EXTENSION_REVOKED',
  MOBILE_LOGIN = 'MOBILE_LOGIN',
  MOBILE_LOGOUT = 'MOBILE_LOGOUT',
  MOBILE_DEVICE_REVOKED = 'MOBILE_DEVICE_REVOKED',
  GOOGLE_PLAY_PURCHASE = 'GOOGLE_PLAY_PURCHASE',
}
