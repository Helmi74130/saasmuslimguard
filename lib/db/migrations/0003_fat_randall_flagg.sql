CREATE TABLE "mobile_devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar(255) NOT NULL,
	"team_id" integer,
	"user_id" integer,
	"device_name" varchar(100),
	"device_id" varchar(255),
	"platform" varchar(20) DEFAULT 'android',
	"app_version" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_used_at" timestamp DEFAULT now(),
	"revoked_at" timestamp,
	CONSTRAINT "mobile_devices_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "mobile_devices" ADD CONSTRAINT "mobile_devices_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_devices" ADD CONSTRAINT "mobile_devices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;