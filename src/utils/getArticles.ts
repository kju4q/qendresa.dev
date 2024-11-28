import fs from "fs";
import path from "path";

const articlesDirectory = path.join(process.cwd(), "src/app/articles");

export function getArticles() {
  // Read all files in the articles directory
  const filenames = fs.readdirSync(articlesDirectory);

  // Extract slug (filename without extension) and metadata for each article
  return filenames
    .filter((file) => file.endsWith(".tsx") && file !== "[slug]") // Ignore dynamic route folder
    .map((filename) => ({
      slug: filename.replace(".tsx", ""), // Remove the extension
      title: filename
        .replace(".tsx", "")
        .replace(/([A-Z])/g, " $1")
        .trim(), // Convert camelCase to readable title
    }));
}
