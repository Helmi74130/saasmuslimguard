CREATE TABLE "video_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"icon" varchar(50) NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"youtube_id" varchar(20) NOT NULL,
	"title" varchar(255) NOT NULL,
	"thumbnail_url" text,
	"category_id" integer NOT NULL,
	"has_sound" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_category_id_video_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."video_categories"("id") ON DELETE cascade ON UPDATE no action;