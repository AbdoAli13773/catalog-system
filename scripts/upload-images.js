require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const folder = path.join(__dirname, "../uploads");

async function upload() {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const filePath = path.join(folder, file);

    const { error } = await supabase.storage
      .from("products")
      .upload(file, fs.readFileSync(filePath), {
        upsert: true,
      });

    if (error) {
      console.log("❌", file, error.message);
    } else {
      console.log("✅", file);
    }
  }

  console.log("Finished");
}

upload();