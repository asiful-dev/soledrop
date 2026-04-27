import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "./lib/db/schema";
import { eq } from "drizzle-orm";
import { config } from "dotenv";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const email = process.argv[2];

if (!email) {
  console.error(
    "Please provide an email address: node promote-user.mjs user@example.com",
  );
  process.exit(1);
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

async function promote() {
  console.log(`Promoting ${email} to admin...`);

  try {
    const result = await db
      .update(users)
      .set({ role: "admin" })
      .where(eq(users.email, email))
      .returning();

    if (result.length === 0) {
      console.error(`User with email ${email} not found in database.`);
      console.log("Tip: Sync the user first by logging into the app.");
    } else {
      console.log(`Successfully promoted ${email} to admin!`);
    }
  } catch (error) {
    console.error("Error promoting user:", error);
  }
}

promote();
