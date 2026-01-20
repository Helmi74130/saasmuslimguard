CREATE TABLE "extension_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar(255) NOT NULL,
	"team_id" integer,
	"user_id" integer,
	"device_name" varchar(100),
	"extension_version" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_used_at" timestamp,
	"revoked_at" timestamp,
	CONSTRAINT "extension_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "extension_tokens" ADD CONSTRAINT "extension_tokens_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "extension_tokens" ADD CONSTRAINT "extension_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;