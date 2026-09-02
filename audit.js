/**
 * Internal Technical SEO, Schema, and Link Integrity Audit Suite
 * Audits all generated static pages in dist/
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const TARGET_PHONE = 'tel:+18773610428';

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function runAudit() {
  console.log('🔍 Starting Technical SEO & Quality Audit for Elgin HVAC Website...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ ERROR: dist directory not found! Run "node generator.js" first.');
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`📄 Found ${htmlFiles.length} HTML files to inspect.`);

  const titles = new Map();
  const descriptions = new Map();
  const allInternalLinks = [];
  let totalSchemaCount = 0;
  let totalPhoneLinksCount = 0;
  let errorCount = 0;
  let warningCount = 0;

  htmlFiles.forEach(filePath => {
    const relPath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Check Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      console.error(`❌ [${relPath}] Missing or empty <title> tag.`);
      errorCount++;
    } else {
      const title = titleMatch[1].trim();
      if (titles.has(title)) {
        console.warn(`⚠️ [${relPath}] Duplicate title found: "${title}" (also in ${titles.get(title)})`);
        warningCount++;
      } else {
        titles.set(title, relPath);
      }
    }

    // 2. Check Meta Description
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    if (!descMatch || !descMatch[1].trim()) {
      console.error(`❌ [${relPath}] Missing or empty <meta name="description"> tag.`);
      errorCount++;
    } else {
      const desc = descMatch[1].trim();
      if (descriptions.has(desc)) {
        console.warn(`⚠️ [${relPath}] Duplicate description found: "${desc}" (also in ${descriptions.get(desc)})`);
        warningCount++;
      } else {
        descriptions.set(desc, relPath);
      }
    }

    // 3. Check H1 Count
    const h1Matches = content.match(/<h1[^>]*>(.*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      console.error(`❌ [${relPath}] Missing <h1> tag.`);
      errorCount++;
    } else if (h1Matches.length > 1) {
      console.warn(`⚠️ [${relPath}] Multiple <h1> tags found (${h1Matches.length}).`);
      warningCount++;
    }

    // 4. Check Canonical
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
    if (!canonicalMatch || !canonicalMatch[1].trim()) {
      console.error(`❌ [${relPath}] Missing canonical tag.`);
      errorCount++;
    }

    // 5. Check JSON-LD Structured Data
    const jsonLdMatches = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
    if (jsonLdMatches) {
      jsonLdMatches.forEach(scriptTag => {
        const rawJson = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        try {
          const parsed = JSON.parse(rawJson);
          if (parsed['@context'] && parsed['@type']) {
            totalSchemaCount++;
          }
        } catch (e) {
          console.error(`❌ [${relPath}] Malformed JSON-LD structured data: ${e.message}`);
          errorCount++;
        }
      });
    }

    // 6. Check Phone Links
    const phoneMatches = content.match(/href=["'](tel:[^"']+)["']/gi);
    if (phoneMatches) {
      phoneMatches.forEach(pm => {
        totalPhoneLinksCount++;
        const phoneVal = pm.replace(/href=["']|["']/gi, '');
        if (phoneVal !== TARGET_PHONE) {
          console.warn(`⚠️ [${relPath}] Unexpected phone number link: "${phoneVal}" (expected "${TARGET_PHONE}")`);
          warningCount++;
        }
      });
    }

    // 7. Collect Internal Links for 404 Validation
    const linkMatches = content.match(/href=["'](\/[^"']*)["']/gi);
    if (linkMatches) {
      linkMatches.forEach(lm => {
        let href = lm.replace(/href=["']|["']/gi, '');
        // Remove hash / query params
        href = href.split('#')[0].split('?')[0];
        if (href.startsWith('/')) {
          allInternalLinks.push({ from: relPath, target: href });
        }
      });
    }
  });

  // 8. Validate Internal Links (Zero Broken Links)
  console.log(`\n🔗 Validating ${allInternalLinks.length} internal links...`);
  let brokenLinksCount = 0;

  allInternalLinks.forEach(link => {
    let target = link.target;
    if (target.endsWith('/')) {
      target += 'index.html';
    }
    const targetFilePath = path.join(DIST_DIR, target.startsWith('/') ? target.substring(1) : target);

    if (!fs.existsSync(targetFilePath)) {
      console.error(`❌ Broken link in [${link.from}] -> "${link.target}" (File not found at ${targetFilePath})`);
      brokenLinksCount++;
      errorCount++;
    }
  });

  // 9. Check Sitemap.xml
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Missing sitemap.xml file.');
    errorCount++;
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const sitemapUrls = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    console.log(`🗺️ sitemap.xml contains ${sitemapUrls.length} URLs.`);
  }

  // 10. Check Robots.txt
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    console.error('❌ Missing robots.txt file.');
    errorCount++;
  }

  console.log('\n======================================================');
  console.log('📊 AUDIT SUMMARY RESULTS:');
  console.log(`✅ Total HTML Pages Verified: ${htmlFiles.length}`);
  console.log(`✅ Total JSON-LD Schemas Verified: ${totalSchemaCount}`);
  console.log(`✅ Total Verified Phone Call Action Links: ${totalPhoneLinksCount}`);
  console.log(`✅ Total Broken Internal Links: ${brokenLinksCount}`);
  console.log(`⚠️ Warnings: ${warningCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('======================================================\n');

  if (errorCount === 0) {
    console.log('🎉 AUDIT PASSED! All pages, links, schemas, and metadata are 100% valid.');
  } else {
    console.error(`💥 AUDIT FAILED with ${errorCount} errors.`);
    process.exit(1);
  }
}

runAudit();
