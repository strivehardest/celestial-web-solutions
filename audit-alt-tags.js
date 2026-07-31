// ============================================
// Alt Text Audit Script - Celestial Web Solutions
// Run from your project root: node audit-alt-tags.js
// ============================================

const fs = require("fs");
const path = require("path");

const SEARCH_DIRS = ["pages", "components", "sections", "app"];
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

let totalImages = 0;
let missingAlt = [];
let emptyAlt = [];
let weakAlt = [];
let goodAlt = [];

// Keywords that indicate weak/generic alt text
const WEAK_PATTERNS = [
  /^image$/i,
  /^img$/i,
  /^photo$/i,
  /^picture$/i,
  /^logo$/i,
  /^icon$/i,
  /^banner$/i,
  /^thumbnail$/i,
  /^screenshot$/i,
  /^undefined$/i,
  /^null$/i,
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Match <img> tags and Next.js <Image> components
  const imgRegex = /<(?:img|Image)\s([^>]*?)(?:\/>|>)/gs;
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    totalImages++;
    const tag = match[0];
    const attrs = match[1];

    // Get line number
    const upToMatch = content.substring(0, match.index);
    const lineNum = upToMatch.split("\n").length;

    // Extract alt attribute
    const altMatch = attrs.match(/alt=(?:"([^"]*?)"|'([^']*?)'|\{([^}]*?)\})/);

    const entry = {
      file: filePath.replace(process.cwd() + "/", ""),
      line: lineNum,
      tag: tag.substring(0, 80).replace(/\n/g, " ") + (tag.length > 80 ? "..." : ""),
    };

    if (!altMatch) {
      // No alt attribute at all
      missingAlt.push(entry);
    } else {
      const altValue = (altMatch[1] || altMatch[2] || altMatch[3] || "").trim();

      if (altValue === "" || altValue === '""' || altValue === "''") {
        // Empty alt - OK for decorative images, flag for review
        emptyAlt.push(entry);
      } else if (WEAK_PATTERNS.some((p) => p.test(altValue))) {
        // Generic/weak alt text
        weakAlt.push({ ...entry, alt: altValue });
      } else if (altValue.includes("{") || altValue.length < 5) {
        // Dynamic or very short - flag for review
        weakAlt.push({ ...entry, alt: altValue });
      } else {
        goodAlt.push({ ...entry, alt: altValue });
      }
    }
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      scanDirectory(fullPath);
    } else if (entry.isFile() && EXTENSIONS.includes(path.extname(entry.name))) {
      scanFile(fullPath);
    }
  }
}

// Run audit
console.log("🔍 Scanning for images...\n");
for (const dir of SEARCH_DIRS) {
  scanDirectory(path.join(process.cwd(), dir));
}

// ============================================
// REPORT
// ============================================
console.log("=".repeat(60));
console.log("  ALT TEXT AUDIT REPORT - Celestial Web Solutions");
console.log("=".repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   Total images found : ${totalImages}`);
console.log(`   ✅ Good alt text    : ${goodAlt.length}`);
console.log(`   ⚠️  Empty alt text  : ${emptyAlt.length} (review if decorative)`);
console.log(`   🔴 Missing alt      : ${missingAlt.length} (needs fixing)`);
console.log(`   🟡 Weak/generic alt : ${weakAlt.length} (needs improving)`);

if (missingAlt.length > 0) {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 MISSING ALT TEXT (fix these first):");
  console.log("=".repeat(60));
  missingAlt.forEach((item) => {
    console.log(`\n  File : ${item.file} (line ${item.line})`);
    console.log(`  Tag  : ${item.tag}`);
  });
}

if (weakAlt.length > 0) {
  console.log("\n" + "=".repeat(60));
  console.log('🟡 WEAK ALT TEXT (improve these):');
  console.log("=".repeat(60));
  weakAlt.forEach((item) => {
    console.log(`\n  File : ${item.file} (line ${item.line})`);
    console.log(`  Alt  : "${item.alt}"`);
    console.log(`  Tag  : ${item.tag}`);
  });
}

if (emptyAlt.length > 0) {
  console.log("\n" + "=".repeat(60));
  console.log('⚠️  EMPTY ALT TEXT (verify these are decorative):');
  console.log("=".repeat(60));
  emptyAlt.forEach((item) => {
    console.log(`\n  File : ${item.file} (line ${item.line})`);
    console.log(`  Tag  : ${item.tag}`);
  });
}

if (goodAlt.length > 0) {
  console.log("\n" + "=".repeat(60));
  console.log("✅ GOOD ALT TEXT (no action needed):");
  console.log("=".repeat(60));
  goodAlt.forEach((item) => {
    console.log(`  ✓ ${item.file}:${item.line} — "${item.alt}"`);
  });
}

console.log("\n" + "=".repeat(60));
console.log("  Audit complete.");
console.log("=".repeat(60) + "\n");