import fs from "fs";
import path from "path";

export function getArticles() {
  try {
    const articlesDirectory = path.join(process.cwd(), "src/app/articles");
    
    // Check if directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.error(`Articles directory not found: ${articlesDirectory}`);
      return [];
    }
    
    // Read all files in the articles directory
    const filenames = fs.readdirSync(articlesDirectory);

    // Extract slug (filename without extension) and metadata for each article
    return filenames
      .filter((file) => 
        file.endsWith(".tsx") && 
        file !== "[slug]" && 
        !file.startsWith("_")
      ) // Ignore dynamic route folder and special files
      .map((filename) => ({
        slug: filename.replace(".tsx", ""), // Remove the extension
        title: filename
          .replace(".tsx", "")
          .replace(/([A-Z])/g, " $1")
          .trim(), // Convert camelCase to readable title
      }));
  } catch (error) {
    console.error("Error getting articles:", error);
    return [];
  }
}
