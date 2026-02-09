ALTER TABLE "teams" ADD COLUMN "google_play_purchase_token" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "google_play_product_id" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "google_play_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "subscription_source" varchar(20);