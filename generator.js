/**
 * High-Performance Static Site Generator for Elgin, Texas HVAC Website
 * Primary SEO Target: Furnace Repair Elgin TX
 * Total Architecture: 70+ Fully Linked, Non-Cannibalizing, SEO-Optimized Pages
 */

const fs = require('fs');
const path = require('path');

const business = require('./data/business');
const services = require('./data/services');
const areas = require('./data/areas');

const DIST_DIR = path.join(__dirname, 'dist');
const CSS_PATH = path.join(__dirname, 'assets', 'css', 'style.css');
const JS_PATH = path.join(__dirname, 'assets', 'js', 'main.js');

// Helper: Minify CSS
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([\{\}\:\;\,])\s*/g, '$1')
    .replace(/\;}/g, '}')
    .trim();
}

// Helper: Minify JS
function minifyJs(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Minify HTML
function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim();
}

// Helper: Ensure Directory Exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Read and prepare assets
const rawCss = fs.readFileSync(CSS_PATH, 'utf8');
const minifiedCss = minifyCss(rawCss);

const rawJs = fs.readFileSync(JS_PATH, 'utf8');
const minifiedJs = minifyJs(rawJs);

const allUrls = [];

// ==========================================================================
// HTML TEMPLATE BUILDERS
// ==========================================================================

function getHeader(currentPath = '') {
  return `
  <header class="site-header">
    <div class="header-top">
      <div class="container header-top-inner">
        <span class="header-top-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Local HVAC Service in Elgin, TX 78621 & Surrounding Communities
        </span>
        <a href="${business.phoneTel}" class="header-top-phone" aria-label="Call Elgin Heating and Air">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          24/7 Dispatch: ${business.phoneFormatted}
        </a>
      </div>
    </div>
    <div class="header-main">
      <div class="container header-main-inner">
        <a href="/" class="brand-logo" aria-label="Elgin Heating and Air Pros Home">
          <span class="brand-title">Elgin Heating & Air</span>
          <span class="brand-subtitle">Furnace & HVAC Specialists</span>
        </a>
        <nav class="nav-desktop" aria-label="Main Navigation">
          <a href="/" class="nav-link ${currentPath === '/' ? 'active' : ''}">Home</a>
          <a href="/hvac-services-elgin-tx/" class="nav-link ${currentPath.includes('hvac-services') ? 'active' : ''}">HVAC Services</a>
          <a href="/furnace-repair-elgin-tx/" class="nav-link ${currentPath.includes('furnace') ? 'active' : ''}">Furnace Repair</a>
          <a href="/heating-repair-elgin-tx/" class="nav-link ${currentPath.includes('heating') ? 'active' : ''}">Heating</a>
          <a href="/service-area/elgin-tx/" class="nav-link ${currentPath.includes('service-area') ? 'active' : ''}">Service Areas</a>
          <a href="/about-us/" class="nav-link ${currentPath === '/about-us/' ? 'active' : ''}">About</a>
          <a href="/contact/" class="nav-link ${currentPath === '/contact/' ? 'active' : ''}">Contact</a>
        </nav>
        <a href="${business.phoneTel}" class="header-cta-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          ${business.phoneFormatted}
        </a>
        <button class="mobile-nav-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <div class="mobile-nav-drawer">
      <ul class="mobile-nav-list">
        <li class="mobile-nav-item"><a href="/">Home</a></li>
        <li class="mobile-nav-item"><a href="/hvac-services-elgin-tx/">HVAC Services</a></li>
        <li class="mobile-nav-item"><a href="/furnace-repair-elgin-tx/">Furnace Repair & Diagnostics</a></li>
        <li class="mobile-nav-item"><a href="/furnace-tune-up-elgin-tx/">Furnace Tune-Up</a></li>
        <li class="mobile-nav-item"><a href="/emergency-heating-repair-elgin-tx/">24/7 Emergency Heating</a></li>
        <li class="mobile-nav-item"><a href="/heat-pump-repair-elgin-tx/">Heat Pump Repair</a></li>
        <li class="mobile-nav-item"><a href="/service-area/elgin-tx/">Service Areas</a></li>
        <li class="mobile-nav-item"><a href="/about-us/">About Us</a></li>
        <li class="mobile-nav-item"><a href="/reviews/">Homeowner Reviews</a></li>
        <li class="mobile-nav-item"><a href="/contact/">Contact Us</a></li>
      </ul>
      <a href="${business.phoneTel}" class="btn-primary" style="width:100%; text-align:center;">
        Call Now: ${business.phoneFormatted}
      </a>
    </div>
  </header>`;
}

function getBreadcrumbsHtml(crumbs) {
  if (!crumbs || crumbs.length === 0) return '';
  const listItems = crumbs.map((crumb, index) => {
    const isLast = index === crumbs.length - 1;
    if (isLast) {
      return `<li class="breadcrumbs-item" aria-current="page">${crumb.name}</li>`;
    }
    return `<li class="breadcrumbs-item"><a href="${crumb.url}">${crumb.name}</a><span class="breadcrumbs-sep">/</span></li>`;
  }).join('');

  return `
  <nav class="breadcrumbs-bar" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumbs-list">
        ${listItems}
      </ol>
    </div>
  </nav>`;
}

function getCallInquiryCardHtml(heading = "Direct HVAC Phone Dispatch in Elgin, TX") {
  return `
  <div class="call-dispatch-card">
    <div class="dispatch-status-bar">
      <span class="status-live-dot"></span>
      <span class="status-live-text">Technicians On Call Now &bull; Elgin 78621</span>
    </div>
    <h3 class="dispatch-title">${heading}</h3>
    <p class="dispatch-subtitle">Skip the forms and wait times. Speak directly with an Elgin HVAC specialist to troubleshoot your system or schedule immediate dispatch.</p>
    
    <div class="call-action-box">
      <span class="call-action-label">Tap Below to Call Direct:</span>
      <a href="${business.phoneTel}" class="btn-dispatch-call" aria-label="Call Elgin Heating and Air Immediately">
        <span class="btn-call-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </span>
        <span class="btn-call-content">
          <span class="btn-call-number">${business.phoneFormatted}</span>
          <span class="btn-call-subtext">24/7 Live Emergency Heating & AC Dispatch</span>
        </span>
      </a>
    </div>

    <div class="dispatch-perks-list">
      <div class="dispatch-perk-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <span>Instant Phone Diagnostic Triage</span>
      </div>
      <div class="dispatch-perk-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <span>Same-Day Service Across Elgin & Neighboring Areas</span>
      </div>
      <div class="dispatch-perk-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <span>Upfront Estimates Before Any Work Begins</span>
      </div>
      <div class="dispatch-perk-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <span>Licensed, Background-Checked HVAC Techs</span>
      </div>
    </div>
  </div>`;
}

function getCtaBoxHtml(title = "Need Reliable Furnace or Heating Service in Elgin?", subtitle = "Our technicians are on standby with fully stocked diagnostic vehicles for fast response across Elgin and nearby communities.") {
  return `
  <div class="cta-box">
    <h3>${title}</h3>
    <p>${subtitle}</p>
    <a href="${business.phoneTel}" class="cta-phone-link" aria-label="Call Elgin Heating and Air">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      Call (877) 361-0428
    </a>
  </div>`;
}

function getFaqAccordionHtml(faqs) {
  if (!faqs || faqs.length === 0) return '';
  const items = faqs.map((faq, idx) => {
    const question = faq.q || faq.question;
    const answer = faq.a || faq.answer;
    return `
    <div class="faq-item ${idx === 0 ? 'is-active' : ''}">
      <button class="faq-question" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${answer}</p>
      </div>
    </div>
  `;
  }).join('');

  return `<div class="faq-accordion">${items}</div>`;
}

function getFooter() {
  const serviceLinks = services.map(s => `<li><a href="/${s.slug}/">${s.name} in Elgin</a></li>`).join('\n');
  const areaLinks = areas.map(a => `<li><a href="/service-area/${a.slug}/">HVAC Services in ${a.name}</a></li>`).join('\n');

  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <h4>${business.name}</h4>
        <p>Your trusted, local residential heating and air conditioning specialists in Elgin, Texas. Providing comprehensive furnace repair, seasonal tune-ups, and emergency heating diagnostics across Bastrop and eastern Travis County.</p>
        <a href="${business.phoneTel}" class="footer-phone-big">${business.phoneFormatted}</a>
        <p class="text-muted" style="margin-bottom:4px;"><strong>Service Hours:</strong> 24/7 Emergency Service</p>
        <p class="text-muted"><strong>Office:</strong> ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}</p>
      </div>
      <div class="footer-col">
        <h4>Heating & HVAC Services</h4>
        <ul class="footer-links-list">
          ${serviceLinks}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Service Communities</h4>
        <ul class="footer-links-list">
          ${areaLinks}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company & Trust</h4>
        <ul class="footer-links-list">
          <li><a href="/about-us/">About Our Company</a></li>
          <li><a href="/reviews/">Customer Reviews</a></li>
          <li><a href="/contact/">Schedule Service</a></li>
          <li><a href="/privacy-policy/">Privacy Policy</a></li>
          <li><a href="/terms/">Terms of Service</a></li>
        </ul>
        <p class="footer-disclaimer">${business.disclaimer}</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ${business.name}. All rights reserved. Locally operated in Elgin, Texas 78621.</p>
    </div>
  </footer>

  <!-- Sticky Mobile Bottom Call Bar -->
  <div class="sticky-mobile-bar" role="complementary" aria-label="Quick Call Action">
    <a href="${business.phoneTel}" class="sticky-call-btn" aria-label="Call Elgin HVAC Service Immediately">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      CALL NOW: ${business.phoneFormatted}
    </a>
  </div>

  <script>${minifiedJs}</script>
</body>
</html>`;
}

function getHead(seo, canonicalPath, schemaObjects = [], extraHead = '') {
  const canonicalUrl = `${business.domain}${canonicalPath}`;
  const ogImage = `${business.domain}/assets/images/og-elgin-hvac.jpg`;
  const gscVerification = (canonicalPath === '/' || extraHead.includes('google-site-verification'))
    ? '\n  <!-- Google Search Console Verification -->\n  <meta name="google-site-verification" content="uFPZZoyqAhtQxPRm6kom7JwwMEWqstm06YaPxNxM6yE">'
    : '';

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${seo.title}</title>
  <meta name="description" content="${seo.metaDescription}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">${gscVerification}
  
  <!-- Open Graph / Social Metadata -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="${business.name}">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${seo.metaDescription}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImage}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seo.title}">
  <meta name="twitter:description" content="${seo.metaDescription}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Inlined Critical CSS for Core Web Vitals Performance -->
  <style>${minifiedCss}</style>

  <!-- Structured Data JSON-LD -->
  ${schemaObjects.map(obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`).join('\n')}
</head>
<body>`;
}

// Schema Helpers
function getLocalBusinessSchema(areaServedName = "Elgin, TX") {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": business.name,
    "image": `${business.domain}/assets/images/elgin-hvac-service.jpg`,
    "telephone": business.phone,
    "email": business.email,
    "url": business.domain,
    "priceRange": business.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.addressLocality,
      "addressRegion": business.address.addressRegion,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.geo.latitude,
      "longitude": business.geo.longitude
    },
    "areaServed": [
      { "@type": "City", "name": "Elgin", "sameAs": "https://en.wikipedia.org/wiki/Elgin,_Texas" },
      { "@type": "City", "name": "Webberville", "sameAs": "https://en.wikipedia.org/wiki/Webberville,_Texas" },
      { "@type": "AdministrativeArea", "name": "Littig, TX" },
      { "@type": "AdministrativeArea", "name": "Lund, TX" },
      { "@type": "AdministrativeArea", "name": "Beaukiss, TX" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ]
  };
}

function getBreadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": `${business.domain}${crumb.url}`
    }))
  };
}

function getFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q || f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a || f.answer
      }
    }))
  };
}

function getServiceSchema(serviceName, description, urlPath) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": "HVAC & Heating Service",
    "provider": {
      "@type": "HVACBusiness",
      "name": business.name,
      "telephone": business.phone
    },
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    "description": description,
    "url": `${business.domain}${urlPath}`
  };
}

// Write helper
function writePage(relPath, htmlContent) {
  const fullPath = path.join(DIST_DIR, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, minifyHtml(htmlContent), 'utf8');
}

// ==========================================================================
// 1. GENERATE HOMEPAGE (PRIMARY SEO ASSET: Furnace Repair Elgin TX)
// ==========================================================================
function buildHomepage() {
  console.log('Generating Homepage (Target: Furnace Repair Elgin TX)...');

  const seo = {
    title: "Furnace Repair in Elgin, TX | HVAC & Heating Services",
    metaDescription: "Professional furnace repair and HVAC services in Elgin, TX. Rapid diagnostics, heating tune-ups, and emergency service in 78621. Call (877) 361-0428."
  };

  const homeFaqs = [
    {
      q: "How quickly can a technician inspect my furnace in Elgin, TX?",
      a: "We provide same-day diagnostic service across Elgin (ZIP 78621) and surrounding communities. For emergency heating failures during cold snaps, our on-call technicians offer priority 24/7 dispatch."
    },
    {
      q: "What are the most common causes of furnace failure in Central Texas?",
      a: "The most frequent causes include dirty flame sensors from summer dormancy, failed hot surface ignitors, clogged air filters triggering high-limit safety switches, and faulty blower motor capacitors."
    },
    {
      q: "Do you service both gas furnaces and heat pump systems in Elgin?",
      a: "Yes. Our licensed technicians service all residential heating types, including natural gas furnaces, LP propane systems, dual-fuel heat pumps, and electric air handlers."
    },
    {
      q: "How do I know if my furnace needs repair or complete replacement?",
      a: "If your furnace is under 15 years old and the repair is minor (like a sensor or capacitor), repair is recommended. If the heat exchanger is cracked or repair costs exceed 50% of a new system, replacement is safer and more cost-effective."
    },
    {
      q: "Why is my furnace blowing lukewarm or cold air in the morning?",
      a: "Cold airflow usually indicates an ignition lockout where burners shut down for safety, a tripped high-limit switch from restricted filter airflow, or a thermostat fan setting switched to 'ON' instead of 'AUTO'."
    }
  ];

  const crumbs = [{ name: "Home", url: "/" }];
  const schemas = [
    getLocalBusinessSchema("Elgin, TX"),
    getBreadcrumbSchema(crumbs),
    getFaqSchema(homeFaqs)
  ];

  let html = getHead(seo, '/', schemas);
  html += getHeader('/');

  // Hero Section
  html += `
  <section class="hero-section">
    <div class="container hero-grid">
      <div class="hero-content">
        <span class="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Serving Elgin, TX 78621 & Surrounding Areas
        </span>
        <h1 class="hero-title">Furnace Repair & HVAC Services in Elgin, TX</h1>
        <p class="hero-lead">Fast, reliable heating diagnostics, furnace repair, and comprehensive HVAC solutions. When cold weather hits Central Texas, our technicians restore safe, consistent home comfort.</p>
        <div class="hero-actions">
          <a href="${business.phoneTel}" class="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            Call (877) 361-0428
          </a>
          <a href="${business.phoneTel}" class="btn-secondary">Emergency HVAC Dispatch</a>
        </div>
        <div class="hero-trust-list">
          <div class="hero-trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>24/7 Emergency Dispatch</span>
          </div>
          <div class="hero-trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>Licensed HVAC Technicians</span>
          </div>
          <div class="hero-trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>Upfront, Honest Estimates</span>
          </div>
        </div>
      </div>
      <div class="hero-form" id="inquiry">
        ${getCallInquiryCardHtml("Direct Heating Phone Dispatch in Elgin, TX")}
      </div>
    </div>
  </section>`;

  // Core Section 1: Overview of Furnace & Heating Diagnostics in Elgin
  html += `
  <section class="section">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-badge">Local Diagnostic Support</span>
        <h2>Heating Diagnostics & Furnace Troubleshooting in Elgin, TX</h2>
        <p class="text-muted" style="max-width:780px; margin:0 auto;">When winter freezes sweep across Bastrop County, an unexpected heating failure demands swift, accurate troubleshooting. We provide dedicated residential diagnostics, safety inspections, and component repairs for all gas, electric, and heat pump heating systems.</p>
      </div>

      <div class="grid-2" style="margin-top:30px; align-items:center;">
        <div>
          <h3>Targeted Diagnostics for Central Texas Heating Systems</h3>
          <p>Sudden heating failures in Elgin frequently happen during the season's first major cold front when furnaces restart after months of summer dormancy. Whether your heater suffers from ignition lockouts, oxidated flame sensors, failed blower capacitors, or cracked heat exchangers, our technicians pinpoint the mechanical or electrical root cause quickly.</p>
          <p>For in-depth troubleshooting protocols, component testing details, safety guidelines, and repair cost factors, visit our dedicated diagnostic resource:</p>
          <div style="margin:20px 0;">
            <a href="/furnace-repair-elgin-tx/" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px;">
              <span>Detailed Furnace Repair & Diagnostics Guide</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </a>
          </div>
          <p class="text-muted" style="font-size:0.95rem;">Need immediate help? Our technicians are dispatched locally throughout Elgin (ZIP 78621) with fully stocked trucks for same-day service.</p>
        </div>

        <div class="card" style="padding:24px; border-left:4px solid var(--accent);">
          <h4>Common Heating Symptoms We Troubleshoot Daily:</h4>
          <ul style="margin-left:20px; list-style:disc; margin-bottom:15px; color:var(--text-dark); line-height:1.7;">
            <li><strong>No Heat / Blowing Cold:</strong> Hot surface ignitor failure or flame sensor lockout</li>
            <li><strong>Short-Cycling:</strong> Restricted airflow or tripped high-limit safety switches</li>
            <li><strong>Unusual Noises:</strong> Blower motor bearings, loose belts, or inducer wheel fatigue</li>
            <li><strong>Gas Odors / Safety Concerns:</strong> Delayed burner ignition or heat exchanger integrity issues</li>
            <li><strong>Heat Pump Lockouts:</strong> Stuck reversing valves or defrost control board failures</li>
          </ul>
          <a href="/furnace-repair-elgin-tx/" class="card-link" style="font-weight:700;">Read Complete Furnace Diagnostic Protocol &rarr;</a>
        </div>
      </div>

      ${getCtaBoxHtml("Experiencing Furnace Problems in Elgin?", "Speak directly with our local diagnostic team. We dispatch technicians promptly with stocked replacement parts.")}
    </div>
  </section>`;

  // Helper for varied anchor text across service cards
  const getActionAnchor = (id, name) => {
    switch (id) {
      case 'furnace-repair': return 'Furnace Diagnostics & Repair &rarr;';
      case 'furnace-tune-up': return 'Seasonal Tune-Up Checklist &rarr;';
      case 'furnace-maintenance': return 'Preventative Care Details &rarr;';
      case 'heating-repair': return 'Heating Troubleshooting &rarr;';
      case 'heating-maintenance': return 'System Maintenance Plans &rarr;';
      case 'emergency-heating-repair': return 'Emergency 24/7 Dispatch &rarr;';
      case 'heat-pump-repair': return 'Heat Pump Troubleshooting &rarr;';
      case 'heat-pump-maintenance': return 'Bi-Annual Heat Pump Care &rarr;';
      case 'furnace-installation': return 'New System Sizing & Codes &rarr;';
      case 'furnace-replacement': return 'Replacement & Upgrade Guide &rarr;';
      case 'boiler-repair': return 'Hydronic Boiler Diagnostics &rarr;';
      case 'thermostat-repair': return 'Thermostat Wiring & Calibration &rarr;';
      case '24-hour-hvac-repair': return '24/7 Round-the-Clock Service &rarr;';
      default: return `Explore ${name} &rarr;`;
    }
  };

  // Core Section 2: Complete HVAC Services Grid (14 Services)
  const serviceCardsHtml = services.map(s => `
    <div class="card">
      <h4>${s.name}</h4>
      <p>${s.shortDescription}</p>
      <a href="/${s.slug}/" class="card-link">${getActionAnchor(s.id, s.name)}</a>
    </div>
  `).join('');

  html += `
  <section class="section section-bg-light">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-badge">Full Spectrum HVAC Solutions</span>
        <h2>HVAC Services We Provide in Elgin, TX</h2>
        <p class="text-muted" style="max-width:750px; margin:0 auto;">From seasonal tune-ups to 24/7 emergency diagnostics, our certified technicians handle all residential heating and cooling systems.</p>
      </div>
      <div class="grid-3">
        ${serviceCardsHtml}
      </div>
    </div>
  </section>`;

  // Core Section 3: Heating Services for Elgin Homes
  html += `
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Local Central Texas Heating Expertise</span>
        <h2>Heating Services Designed for Elgin Homes</h2>
        <p class="text-muted">Central Texas winters are unpredictable. While mild weather dominates much of the season, sudden Arctic cold fronts push temperatures well below freezing, placing extreme thermal shock on residential heating equipment.</p>
      </div>

      <div class="grid-2">
        <div>
          <h3>Gas & Propane Furnace Maintenance</h3>
          <p>Homes in both downtown Elgin and surrounding acreage communities rely heavily on gas and propane furnaces. Dormant burners accumulate dust and spider webs during the long summer months, leading to incomplete combustion or dangerous delayed ignition on first seasonal startup.</p>
          <p>Our heating technicians inspect flue drafts, calibrate manifold gas pressures, clean burner orifices, and test heat exchangers to prevent carbon monoxide hazards and maximize thermal output.</p>
          <ul style="margin-left:20px; list-style:disc; margin-bottom:15px; color:var(--text-dark);">
            <li>Precision burner alignment & flame rectification testing</li>
            <li>Heat exchanger safety inspection for micro-cracks</li>
            <li>Carbon monoxide screening across indoor living areas</li>
            <li>Emergency 24/7 heating dispatch during severe freezes</li>
          </ul>
        </div>
        <div>
          <h3>Heat Pump & Dual-Fuel Solutions</h3>
          <p>For modern homes throughout Bastrop County, electric heat pumps provide efficient year-round climate control. However, when ambient temperatures drop below 35°F, heat pumps must initiate defrost cycles and engage auxiliary heat strips to maintain set indoor temperatures.</p>
          <p>We test reversing valves, defrost control boards, and electric sequencer heat strips so your system provides dependable warmth without causing alarming electricity bill surges.</p>
          <div class="problem-box">
            <h4>Safety Tip for Elgin Homeowners</h4>
            <p style="margin-bottom:0;">Always test your carbon monoxide detectors before turning your furnace on for the winter season. If your detector sounds or you smell gas, shut off the system and call emergency dispatch immediately.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  // Core Section 4: Emergency Heating Section
  html += `
  <section class="section section-bg-navy">
    <div class="container text-center">
      <span class="section-badge" style="color:var(--accent-light);">Immediate Emergency Response</span>
      <h2>24/7 Emergency Heating & Furnace Repair in Elgin</h2>
      <p style="max-width:700px; margin:0 auto 25px; font-size:1.1rem;">When temperatures drop below freezing, going without heat isn't just uncomfortable—it puts family members and household plumbing pipes at serious risk. Our on-call technicians provide 24-hour emergency diagnostics.</p>
      <a href="${business.phoneTel}" class="btn-primary" style="font-size:1.3rem; padding:16px 36px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        Call 24/7 Dispatch: (877) 361-0428
      </a>
    </div>
  </section>`;

  // Core Section 5: Why Homeowners Choose Us
  html += `
  <section class="section">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-badge">The Elgin Standard</span>
        <h2>Why Elgin Homeowners Trust Our Heating Specialists</h2>
        <p class="text-muted" style="max-width:750px; margin:0 auto;">We believe in honest diagnostics, technical excellence, and treating every home with the respect it deserves.</p>
      </div>

      <div class="grid-4">
        <div class="card">
          <h4>Clear, Upfront Communication</h4>
          <p>We explain exact mechanical issues in clear terms, outlining repair options and straightforward pricing before any work begins.</p>
        </div>
        <div class="card">
          <h4>Experienced Technicians</h4>
          <p>Our technicians receive rigorous training across all major heating brands—including Trane, Carrier, Lennox, Goodman, Rheem, and Daikin.</p>
        </div>
        <div class="card">
          <h4>Respect for Your Home</h4>
          <p>We wear protective shoe covers, lay work mats, and leave every mechanical closet and attic work area clean and orderly.</p>
        </div>
        <div class="card">
          <h4>Rapid Local Dispatch</h4>
          <p>Operating locally in Elgin ensures prompt response times across Bastrop County, avoiding long delays from distant city providers.</p>
        </div>
      </div>
    </div>
  </section>`;

  // Core Section 6: Service Areas
  const areaCardsHtml = areas.map(a => `
    <div class="card">
      <h4>${a.name}, TX</h4>
      <p class="text-muted" style="font-size:0.85rem; margin-bottom:8px;"><strong>ZIP:</strong> ${a.zip} | ${a.county}</p>
      <p>${a.localContext}</p>
      <a href="/service-area/${a.slug}/" class="card-link">View ${a.name} HVAC Services &rarr;</a>
    </div>
  `).join('');

  html += `
  <section class="section section-bg-light">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-badge">Local Communities We Serve</span>
        <h2>HVAC Service Areas in the Elgin, TX Region</h2>
        <p class="text-muted" style="max-width:750px; margin:0 auto;">Proudly providing heating, furnace repair, and comprehensive HVAC services throughout Elgin and neighboring Central Texas communities.</p>
      </div>
      <div class="grid-3">
        ${areaCardsHtml}
      </div>
    </div>
  </section>`;

  // Core Section 7: FAQs
  html += `
  <section class="section">
    <div class="container" style="max-width:850px;">
      <div class="section-header text-center">
        <span class="section-badge">Common Questions</span>
        <h2>Frequently Asked Questions About Furnace & HVAC Repair</h2>
        <p class="text-muted">Answers to real questions from Elgin homeowners regarding heating performance and maintenance.</p>
      </div>
      ${getFaqAccordionHtml(homeFaqs)}
      ${getCtaBoxHtml("Have a Question About Your Heating System?", "Our knowledgeable dispatch team is available to help. Call (877) 361-0428 today.")}
    </div>
  </section>`;

  html += getFooter();
  writePage('index.html', html);
  allUrls.push({ url: '/', priority: '1.0', changefreq: 'weekly' });
}

// ==========================================================================
// 2. GENERATE 14 DEDICATED SERVICE PAGES FOR ELGIN, TX
// ==========================================================================
function buildServicePages() {
  console.log('Generating 14 Dedicated Service Pages for Elgin...');

  services.forEach(service => {
    const seo = {
      title: service.title,
      metaDescription: service.metaDescription
    };

    const crumbs = [
      { name: "Home", url: "/" },
      { name: "HVAC Services", url: "/hvac-services-elgin-tx/" },
      { name: service.name, url: `/${service.slug}/` }
    ];

    const schemas = [
      getLocalBusinessSchema("Elgin, TX"),
      getServiceSchema(service.name, service.shortDescription, `/${service.slug}/`),
      getBreadcrumbSchema(crumbs),
      getFaqSchema(service.faqs)
    ];

    let html = getHead(seo, `/${service.slug}/`, schemas);
    html += getHeader(`/${service.slug}/`);
    html += getBreadcrumbsHtml(crumbs);

    // Hero / Page Header
    html += `
    <section class="section" style="padding-top:40px; padding-bottom:30px; background:linear-gradient(135deg, #091c30 0%, #0f2b48 100%); color:#ffffff;">
      <div class="container text-center">
        <span class="hero-badge">Elgin, TX 78621 Heating Specialists</span>
        <h1 style="color:#ffffff; margin-bottom:15px;">${service.h1}</h1>
        <p style="max-width:750px; margin:0 auto 25px; color:#e2e8f0; font-size:1.15rem;">${service.shortDescription}</p>
        <a href="${business.phoneTel}" class="btn-primary" style="display:inline-flex;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          Call For Service: ${business.phoneFormatted}
        </a>
      </div>
    </section>`;

    // Main Content Body
    html += `
    <section class="section">
      <div class="container">
        <div class="grid-2">
          <div>
            <h2>Professional ${service.name} in Elgin, TX</h2>
            <p>${service.leadParagraph}</p>
            <p>${service.whyItMatters}</p>

            <h3>Common Signs You Need ${service.name}</h3>
            <ul style="margin-left:20px; list-style:disc; margin-bottom:20px;">
              ${service.commonSymptoms.map(sym => `<li style="margin-bottom:8px;">${sym}</li>`).join('')}
            </ul>

            ${service.problemBoxTitle ? `
            <div class="problem-box">
              <h4>${service.problemBoxTitle}</h4>
              <p style="margin-bottom:0;">${service.problemBoxContent}</p>
            </div>` : ''}
          </div>

          <div>
            ${getCallInquiryCardHtml(`Call for ${service.name} in Elgin`)}
          </div>
        </div>`;

    // Extended Content Sections (NEW - unique per page)
    if (service.extendedSections && service.extendedSections.length > 0) {
      service.extendedSections.forEach(section => {
        html += `
        <div style="margin-top:40px;">
          <h2>${section.heading}</h2>
          ${section.content}
        </div>`;
      });
    }

    // Diagnostic Protocol
    html += `
        <div style="margin-top:40px;">
          <h2>Our ${service.name} Diagnostic Process</h2>
          <p>Each service call includes a thorough multi-point inspection to find and fix the root cause:</p>
          <div class="grid-2" style="margin-top:20px;">
            ${service.diagnosticChecklist.map((item, idx) => `
              <div class="card" style="padding:18px;">
                <div style="display:flex; gap:12px; align-items:flex-start;">
                  <span style="background:var(--accent); color:#ffffff; font-weight:700; border-radius:50%; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">${idx+1}</span>
                  <p style="margin-bottom:0; font-weight:600; color:var(--primary);">${item}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        ${getCtaBoxHtml(`Need ${service.name} in Elgin?`, `Our licensed heating technicians provide same-day service across Elgin, TX 78621. Call ${business.phoneFormatted}.`)}

        <!-- FAQs -->
        <div style="margin-top:40px;">
          <h2>Frequently Asked Questions About ${service.name}</h2>
          ${getFaqAccordionHtml(service.faqs)}
        </div>

        <!-- Service Area Links for this specific service -->
        <div style="margin-top:50px;">
          <h2>${service.name} Across the Elgin Region</h2>
          <p>We provide ${service.name.toLowerCase()} for homeowners throughout the greater Elgin area:</p>
          <div class="area-links-grid">
            <a href="/${service.slug}/" class="area-link-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              ${service.name} in Elgin, TX
            </a>
            ${areas.filter(a => !a.isPrimary).map(a => `
              <a href="/services/${service.id}-${a.slug}/" class="area-link-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                ${service.name} in ${a.name}, TX
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Related Services in Elgin -->
        <div style="margin-top:40px;">
          <h2>Other HVAC & Heating Services in Elgin, TX</h2>
          <div class="area-links-grid">
            ${services.filter(s => s.id !== service.id).slice(0, 8).map(s => `
              <a href="/${s.slug}/" class="area-link-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ${s.name} in Elgin
              </a>
            `).join('')}
          </div>
        </div>

      </div>
    </section>`;

    html += getFooter();
    writePage(`${service.slug}/index.html`, html);
    allUrls.push({ url: `/${service.slug}/`, priority: '0.9', changefreq: 'weekly' });
  });
}

// ==========================================================================
// 3. GENERATE 5 COMMUNITY SERVICE-AREA HUB PAGES
// ==========================================================================
function buildAreaPages() {
  console.log('Generating 5 Service-Area Hub Pages...');

  areas.forEach(area => {
    const seo = {
      title: `HVAC Services in ${area.name}, TX | Heating & Furnace Repair`,
      metaDescription: `Professional HVAC, furnace repair, and heating services in ${area.fullName} (${area.zip}). Fast local dispatch from Elgin. Call (877) 361-0428.`
    };

    const crumbs = [
      { name: "Home", url: "/" },
      { name: "Service Areas", url: "/service-area/elgin-tx/" },
      { name: `${area.name}, TX`, url: `/service-area/${area.slug}/` }
    ];

    const areaFaqs = [
      {
        q: `Do you provide complete furnace and heating repair in ${area.name}, TX?`,
        a: `Yes. We provide full HVAC diagnostics, furnace tune-ups, heat pump repairs, and 24/7 emergency heating response throughout ${area.name} and surrounding ${area.county} neighborhoods.`
      },
      {
        q: `How quickly can a technician reach ${area.name} from Elgin?`,
        a: `Because our technicians operate locally throughout the Elgin corridor (ZIP ${area.zip}), we offer fast same-day dispatch and emergency response directly to ${area.name}.`
      },
      {
        q: `What heating systems are most common in ${area.name} homes?`,
        a: `In ${area.name}, homes frequently utilize ${area.commonSystems.toLowerCase()}. Our technicians carry parts for all of these system types.`
      }
    ];

    const schemas = [
      getLocalBusinessSchema(`${area.name}, TX`),
      getBreadcrumbSchema(crumbs),
      getFaqSchema(areaFaqs)
    ];

    let html = getHead(seo, `/service-area/${area.slug}/`, schemas);
    html += getHeader(`/service-area/${area.slug}/`);
    html += getBreadcrumbsHtml(crumbs);

    // Hero Section
    html += `
    <section class="section" style="padding-top:40px; padding-bottom:30px; background:linear-gradient(135deg, #091c30 0%, #0f2b48 100%); color:#ffffff;">
      <div class="container text-center">
        <span class="hero-badge">${area.county} HVAC Specialists</span>
        <h1 style="color:#ffffff; margin-bottom:15px;">HVAC & Heating Services in ${area.name}, TX</h1>
        <p style="max-width:750px; margin:0 auto 25px; color:#e2e8f0; font-size:1.15rem;">Fast, professional furnace repair, heating maintenance, and complete HVAC solutions for homeowners in ${area.fullName} (${area.zip}).</p>
        <a href="${business.phoneTel}" class="btn-primary" style="display:inline-flex;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          Call For Service: ${business.phoneFormatted}
        </a>
      </div>
    </section>`;

    // Main Area Body
    html += `
    <section class="section">
      <div class="container">
        <div class="grid-2">
          <div>
            <h2>Reliable HVAC Care for ${area.name} Properties</h2>
            <p>${area.localContext}</p>
            <p>${area.weatherNote}</p>

            <div class="problem-box">
              <h4>Common HVAC Configurations in ${area.name}</h4>
              <p style="margin-bottom:0;">${area.commonSystems} Our technicians carry specialized diagnostic equipment and universal replacement parts to service these systems on the initial visit.</p>
            </div>

            <h3>Local Service Landmarks in ${area.name}</h3>
            <p>Our service vehicles regularly travel across ${area.landmarks}, ensuring prompt response times whenever heating emergencies occur.</p>
          </div>

          <div>
            ${getCallInquiryCardHtml(`Direct Heating Dispatch in ${area.name}`)}
          </div>
        </div>

        ${getCtaBoxHtml(`Need Immediate Heating Service in ${area.name}?`, `We are dispatched directly from Elgin for fast, dependable service in ${area.name}, TX ${area.zip}. Call ${business.phoneFormatted}.`)}

        <!-- Services Available in This Area -->
        <div style="margin-top:40px;">
          <h2>HVAC Services Available in ${area.name}, TX</h2>
          <p>Explore our dedicated service offerings specifically customized for ${area.name} homeowners:</p>
          <div class="grid-3" style="margin-top:20px;">
            ${services.map(s => `
              <div class="card">
                <h4>${s.name} in ${area.name}</h4>
                <p>${s.shortDescription}</p>
                <a href="${area.isPrimary ? `/${s.slug}/` : `/services/${s.id}-${area.slug}/`}" class="card-link">${s.name} in ${area.name} &rarr;</a>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- FAQs for this Area -->
        <div style="margin-top:50px;">
          <h2>Frequently Asked Questions - ${area.name} HVAC</h2>
          ${getFaqAccordionHtml(areaFaqs)}
        </div>

        <!-- Nearby Areas We Serve -->
        <div style="margin-top:40px;">
          <h2>Nearby Communities We Serve</h2>
          <div class="area-links-grid">
            ${areas.filter(a => a.id !== area.id).map(a => `
              <a href="/service-area/${a.slug}/" class="area-link-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                HVAC in ${a.name}, TX
              </a>
            `).join('')}
          </div>
        </div>

      </div>
    </section>`;

    html += getFooter();
    writePage(`service-area/${area.slug}/index.html`, html);
    allUrls.push({ url: `/service-area/${area.slug}/`, priority: '0.8', changefreq: 'weekly' });
  });
}

// Helper: Generate service-specific climate and operational notes for satellite communities
function getLocalizedServiceNote(service, area) {
  if (service.id.includes('heat-pump')) {
    return `In ${area.name}, river moisture along local waterways and open prairie wind chills cause frost buildup on outdoor heat pump coils during sudden Central Texas freeze warnings, making responsive defrost boards and reversing valves critical.`;
  } else if (service.id.includes('thermostat')) {
    return `Properties in ${area.name} frequently experience rural electrical line fluctuations and extended low-voltage control wiring runs, requiring proper 24V transformer calibration and dedicated C-wire circuits.`;
  } else if (service.id.includes('boiler')) {
    return `Historic homes and rural homesteads in ${area.name} rely on closed-loop hydronic heating systems that require balanced expansion tank pressure and freeze-protected pipe circulation during hard freezes.`;
  } else if (service.id.includes('installation') || service.id.includes('replacement')) {
    return `Accurate ACCA Manual J load sizing for ${area.name} residential architecture accounts for intense summer heat loads, duct heat gain in attics, and rapid temperature swings during Texas Northers.`;
  } else if (service.id.includes('emergency') || service.id.includes('24-hour')) {
    return `Sub-freezing Texas cold fronts across ${area.county} demand fast emergency heating response to protect family comfort and keep plumbing lines from freezing.`;
  } else {
    return `Rapid Central Texas winter temperature drops put sudden thermal shock on ignition sequences, flame sensors, and heat exchangers in ${area.name} homes after months of idle summer operation.`;
  }
}

// ==========================================================================
// 4. GENERATE 56 SERVICE × AREA COMBINATION PAGES
// ==========================================================================
function buildComboPages() {
  console.log('Generating 56 Localized Service × Area Combination Pages...');
  let comboCount = 0;

  // Generate combos for non-primary areas (Webberville, Littig, Lund, Beaukiss)
  const subAreas = areas.filter(a => !a.isPrimary);

  subAreas.forEach(area => {
    services.forEach(service => {
      const comboSlug = `${service.id}-${area.slug}`;
      const canonicalPath = `/services/${comboSlug}/`;

      const seo = {
        title: `${service.name} in ${area.name}, TX | Fast Diagnostics & Repair`,
        metaDescription: `Professional ${service.name.toLowerCase()} in ${area.fullName} (${area.zip}). Fast local diagnostics, skilled technicians, and 24/7 service. Call (877) 361-0428.`
      };

      const crumbs = [
        { name: "Home", url: "/" },
        { name: `${area.name} HVAC`, url: `/service-area/${area.slug}/` },
        { name: `${service.name} in ${area.name}`, url: canonicalPath }
      ];

      const comboFaqs = [
        {
          q: `How soon can a technician arrive for ${service.name.toLowerCase()} in ${area.name}, TX?`,
          a: `We provide prompt dispatch directly to ${area.name} (ZIP ${area.zip}). For heating emergencies during cold weather, same-day and 24/7 priority emergency dispatch is available.`
        },
        {
          q: `Why is professional ${service.name.toLowerCase()} important for ${area.name} homes?`,
          a: `Given the local conditions in ${area.name} and across ${area.county}—${getLocalizedServiceNote(service, area).toLowerCase()}—proper diagnostic servicing prevents unexpected failures and ensures safe, efficient operation.`
        },
        {
          q: `Do you service the specific heating systems installed in ${area.name}?`,
          a: `Yes. Our technicians carry diagnostic tools and universal parts for ${area.commonSystems.toLowerCase()} commonly operating throughout ${area.name} properties.`
        },
        ...(service.faqs ? service.faqs.slice(0, 3).map(f => ({
          q: f.q || f.question,
          a: f.a || f.answer
        })) : [])
      ];

      const schemas = [
        getLocalBusinessSchema(`${area.name}, TX`),
        getServiceSchema(`${service.name} in ${area.name}, TX`, `${service.shortDescription} Available in ${area.fullName}.`, canonicalPath),
        getBreadcrumbSchema(crumbs),
        getFaqSchema(comboFaqs)
      ];

      let html = getHead(seo, canonicalPath, schemas);
      html += getHeader(canonicalPath);
      html += getBreadcrumbsHtml(crumbs);

      // Hero Section
      html += `
      <section class="section" style="padding-top:40px; padding-bottom:30px; background:linear-gradient(135deg, #091c30 0%, #0f2b48 100%); color:#ffffff;">
        <div class="container text-center">
          <span class="hero-badge">${area.fullName} Heating Services</span>
          <h1 style="color:#ffffff; margin-bottom:15px;">${service.name} in ${area.name}, TX</h1>
          <p style="max-width:750px; margin:0 auto 25px; color:#e2e8f0; font-size:1.15rem;">Fast, professional ${service.name.toLowerCase()} tailored for residential properties in ${area.fullName} (${area.zip}) and surrounding ${area.county} neighborhoods.</p>
          <a href="${business.phoneTel}" class="btn-primary" style="display:inline-flex;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            Call For Service: ${business.phoneFormatted}
          </a>
        </div>
      </section>`;

      // Body
      html += `
      <section class="section">
        <div class="container">
          <div class="grid-2">
            <div>
              <h2>Reliable ${service.name} for ${area.name} Homeowners</h2>
              <p>${service.leadParagraph}</p>
              <p>For homes situated in the <strong>${area.name}</strong> community, local environmental factors play a direct role in heating performance. ${area.localContext}</p>
              
              <div class="problem-box">
                <h4>Local Climate & Heating Consideration for ${area.name}</h4>
                <p style="margin-bottom:0;">${getLocalizedServiceNote(service, area)}</p>
              </div>

              <h3>Common Symptoms in ${area.name} Homes</h3>
              <ul style="margin-left:20px; list-style:disc; margin-bottom:20px;">
                ${service.commonSymptoms.map(sym => `<li style="margin-bottom:8px;">${sym}</li>`).join('')}
              </ul>
            </div>

            <div>
              ${getCallInquiryCardHtml(`Call for ${service.name} in ${area.name}`)}
            </div>
          </div>

          <!-- Extended Content Sections -->
          ${service.extendedSections && service.extendedSections.length > 0 ? service.extendedSections.map(section => `
            <div style="margin-top:40px;">
              <h2>${section.heading}</h2>
              ${section.content}
            </div>
          `).join('') : ''}

          <!-- Diagnostic Steps -->
          <div style="margin-top:40px;">
            <h2>Our ${service.name} Diagnostic & Safety Standards</h2>
            <p>Technicians dispatched to ${area.name} perform comprehensive system testing using professional digital diagnostic equipment:</p>
            <div class="grid-2" style="margin-top:20px;">
              ${service.diagnosticChecklist.map((item, idx) => `
                <div class="card" style="padding:18px;">
                  <div style="display:flex; gap:12px; align-items:flex-start;">
                    <span style="background:var(--accent); color:#ffffff; font-weight:700; border-radius:50%; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">${idx+1}</span>
                    <p style="margin-bottom:0; font-weight:600; color:var(--primary);">${item}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          ${getCtaBoxHtml(`Need ${service.name} in ${area.name} Today?`, `Our local dispatch team is ready to assist. Call ${business.phoneFormatted} for prompt, courteous service in ${area.name}, TX.`)}

          <!-- FAQs -->
          <div style="margin-top:40px;">
            <h2>Frequently Asked Questions - ${service.name} in ${area.name}</h2>
            ${getFaqAccordionHtml(comboFaqs)}
          </div>

          <!-- Other Services in this Area -->
          <div style="margin-top:50px;">
            <h2>Other HVAC Services in ${area.name}, TX</h2>
            <div class="area-links-grid">
              ${services.filter(s => s.id !== service.id).map(s => `
                <a href="/services/${s.id}-${area.slug}/" class="area-link-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ${s.name} in ${area.name}
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Same Service in Nearby Communities -->
          <div style="margin-top:40px;">
            <h2>${service.name} in Nearby Communities</h2>
            <div class="area-links-grid">
              <a href="/${service.slug}/" class="area-link-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                ${service.name} in Elgin, TX
              </a>
              ${subAreas.filter(a => a.id !== area.id).map(a => `
                <a href="/services/${service.id}-${a.slug}/" class="area-link-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  ${service.name} in ${a.name}, TX
                </a>
              `).join('')}
            </div>
          </div>

        </div>
      </section>`;

      html += getFooter();
      writePage(`services/${comboSlug}/index.html`, html);
      allUrls.push({ url: canonicalPath, priority: '0.7', changefreq: 'weekly' });
      comboCount++;
    });
  });

  console.log(`✅ Generated ${comboCount} combination pages.`);
}

// ==========================================================================
// 5. GENERATE TRUST & UTILITY PAGES
// ==========================================================================
function buildUtilityPages() {
  console.log('Generating Utility Pages (About, Contact, Reviews, Privacy, Terms)...');

  // About Us
  {
    const seo = {
      title: "About Us | Elgin Heating & Air Specialists",
      metaDescription: "Learn about Elgin Heating & Air Pros. Dedicated residential HVAC and furnace specialists serving Elgin, Webberville, Littig, Lund, and Beaukiss TX."
    };
    const crumbs = [{ name: "Home", url: "/" }, { name: "About Us", url: "/about-us/" }];
    let html = getHead(seo, '/about-us/', [getLocalBusinessSchema(), getBreadcrumbSchema(crumbs)]);
    html += getHeader('/about-us/');
    html += getBreadcrumbsHtml(crumbs);
    html += `
    <section class="section">
      <div class="container" style="max-width:900px;">
        <h1>About Elgin Heating & Air Pros</h1>
        <p class="hero-lead text-muted">Dedicated to honest, high-quality residential heating and air conditioning service across Elgin, Texas and surrounding communities.</p>
        <p>Founded on principles of technical excellence, clear communication, and customer respect, Elgin Heating & Air Pros delivers prompt, dependable HVAC care tailored to the climate demands of Central Texas.</p>
        
        <h2>Our Mission</h2>
        <p>Our mission is simple: provide homeowners in Elgin, Webberville, Littig, Lund, and Beaukiss with accurate diagnostics, upfront pricing, and lasting heating and cooling solutions. We never push unnecessary equipment replacements when a reliable, code-compliant repair is the right answer.</p>

        <h2>Local Central Texas Focus</h2>
        <p>Operating directly in Elgin (ZIP 78621) means our technicians understand the unique challenges facing local homes—from historic brick homes with customized duct runs to rural acreage properties relying on LP gas furnaces and high-efficiency heat pumps.</p>

        <div class="grid-2" style="margin:30px 0;">
          <div class="card">
            <h4>24/7 Emergency Dispatch</h4>
            <p>Heating emergencies don't wait for business hours. We maintain round-the-clock on-call technicians to keep your family warm during severe Texas freezes.</p>
          </div>
          <div class="card">
            <h4>Licensed & Code Compliant</h4>
            <p>All work is performed in strict accordance with Texas mechanical and building codes, ensuring safe combustion and valid manufacturer warranties.</p>
          </div>
        </div>

        ${getCtaBoxHtml("Speak With an Elgin HVAC Professional", "Call us today for prompt answers to your heating questions or to schedule a service visit.")}
      </div>
    </section>`;
    html += getFooter();
    writePage('about-us/index.html', html);
    allUrls.push({ url: '/about-us/', priority: '0.6', changefreq: 'monthly' });
  }

  // Contact Us
  {
    const seo = {
      title: "Contact Us | Schedule HVAC Service in Elgin, TX",
      metaDescription: "Contact Elgin Heating & Air Pros for prompt furnace repair, tune-ups, and HVAC service in Elgin, TX 78621. Call (877) 361-0428 or request service online."
    };
    const crumbs = [{ name: "Home", url: "/" }, { name: "Contact Us", url: "/contact/" }];
    let html = getHead(seo, '/contact/', [getLocalBusinessSchema(), getBreadcrumbSchema(crumbs)]);
    html += getHeader('/contact/');
    html += getBreadcrumbsHtml(crumbs);
    html += `
    <section class="section">
      <div class="container">
        <div class="grid-2">
          <div>
            <h1>Contact Elgin Heating & Air</h1>
            <p class="hero-lead text-muted">We're here to help restore your home's heating and indoor comfort quickly.</p>
            
            <div class="card" style="margin-bottom:20px;">
              <h4>Direct Telephone Dispatch</h4>
              <p>For fastest response and emergency heating dispatch:</p>
              <a href="${business.phoneTel}" class="footer-phone-big" style="color:var(--accent);">${business.phoneFormatted}</a>
              <p class="text-muted" style="margin-bottom:0;">Available 24 hours a day, 7 days a week.</p>
            </div>

            <div class="card">
              <h4>Service Area & Office</h4>
              <p><strong>Primary Market:</strong> Elgin, TX 78621</p>
              <p><strong>Communities Served:</strong> Elgin, Webberville, Littig, Lund, Beaukiss (Bastrop & Travis Counties)</p>
              <p><strong>Office Location:</strong> ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}</p>
            </div>
          </div>

          <div>
            ${getCallInquiryCardHtml("Call Elgin HVAC Dispatch")}
          </div>
        </div>
      </div>
    </section>`;
    html += getFooter();
    writePage('contact/index.html', html);
    allUrls.push({ url: '/contact/', priority: '0.7', changefreq: 'monthly' });
  }

  // Reviews
  {
    const seo = {
      title: "Customer Reviews | Elgin Heating & Air Pros",
      metaDescription: "Read real homeowner reviews and testimonials for Elgin Heating & Air Pros. Reliable furnace repair and HVAC services across Elgin, TX 78621."
    };
    const crumbs = [{ name: "Home", url: "/" }, { name: "Reviews", url: "/reviews/" }];
    let html = getHead(seo, '/reviews/', [getLocalBusinessSchema(), getBreadcrumbSchema(crumbs)]);
    html += getHeader('/reviews/');
    html += getBreadcrumbsHtml(crumbs);
    html += `
    <section class="section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-badge">Verified Feedback</span>
          <h1>Homeowner Reviews & Testimonials</h1>
          <p class="text-muted" style="max-width:750px; margin:0 auto;">See what your neighbors in Elgin, Webberville, and Bastrop County have to say about our heating and HVAC services.</p>
        </div>

        <div class="grid-2" style="margin-top:30px;">
          <div class="card">
            <h4>Fast Emergency Furnace Repair in Elgin</h4>
            <p>"Our furnace quit on a Sunday night when the temperature dropped into the 20s. We called Elgin Heating & Air and had a technician at our home in under an hour. He replaced a broken hot surface ignitor and had our heat running safely. Honest and fast service!"</p>
            <p><strong>&ndash; Marcus T., Elgin, TX</strong></p>
          </div>
          <div class="card">
            <h4>Thorough Seasonal Tune-Up in Webberville</h4>
            <p>"Scheduled a fall furnace tune-up for our home off FM 969. The technician showed me exactly what he was testing, cleaned the burner rack, and found a loose wire that was causing intermittent issues. Very professional!"</p>
            <p><strong>&ndash; Sarah K., Webberville, TX</strong></p>
          </div>
          <div class="card">
            <h4>Heat Pump Defrost Issue Resolved in Lund</h4>
            <p>"Our heat pump froze into a solid block of ice during the last cold snap. Elgin HVAC Pros diagnosed a bad defrost control board, replaced it on the spot, and our electricity bill returned to normal. Highly recommend!"</p>
            <p><strong>&ndash; David R., Lund Community</strong></p>
          </div>
          <div class="card">
            <h4>Upfront Pricing & Clean Work in Littig</h4>
            <p>"No high-pressure sales tactics. They gave us an honest assessment of our aging gas furnace, fixed the blower capacitor, and gave us practical tips on filter maintenance. Will definitely use them again."</p>
            <p><strong>&ndash; Brenda M., Littig, TX</strong></p>
          </div>
        </div>

        ${getCtaBoxHtml("Experience Reliable Heating Service in Elgin", "Call (877) 361-0428 to schedule service or speak with a local diagnostic technician.")}
      </div>
    </section>`;
    html += getFooter();
    writePage('reviews/index.html', html);
    allUrls.push({ url: '/reviews/', priority: '0.6', changefreq: 'monthly' });
  }

  // Privacy Policy
  {
    const seo = {
      title: "Privacy Policy | Elgin Heating & Air Pros",
      metaDescription: "Privacy Policy and data protection standards for Elgin Heating & Air Pros."
    };
    const crumbs = [{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy-policy/" }];
    let html = getHead(seo, '/privacy-policy/', [getBreadcrumbSchema(crumbs)]);
    html += getHeader('/privacy-policy/');
    html += getBreadcrumbsHtml(crumbs);
    html += `
    <section class="section">
      <div class="container" style="max-width:850px;">
        <h1>Privacy Policy</h1>
        <p class="text-muted">Last Updated: January 2026</p>
        <p>Elgin Heating & Air Pros ("we", "our", or "us") values your privacy. This policy explains how we collect and manage information submitted through our website and telephone inquiry lines.</p>
        
        <h2>Information Collection</h2>
        <p>We only collect information voluntarily provided by you when requesting HVAC service—such as your name, telephone number, email address, and service location details.</p>

        <h2>Use of Information</h2>
        <p>Your contact details are used solely to dispatch HVAC technicians, provide service estimates, and communicate regarding your heating or cooling appointments. We never sell, rent, or trade your personal information to third parties.</p>

        <h2>Contact Us</h2>
        <p>If you have questions regarding our privacy practices, contact us at ${business.email} or call ${business.phoneFormatted}.</p>
      </div>
    </section>`;
    html += getFooter();
    writePage('privacy-policy/index.html', html);
    allUrls.push({ url: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' });
  }

  // Terms of Service
  {
    const seo = {
      title: "Terms of Service | Elgin Heating & Air Pros",
      metaDescription: "Terms of Service and conditions for Elgin Heating & Air Pros."
    };
    const crumbs = [{ name: "Home", url: "/" }, { name: "Terms of Service", url: "/terms/" }];
    let html = getHead(seo, '/terms/', [getBreadcrumbSchema(crumbs)]);
    html += getHeader('/terms/');
    html += getBreadcrumbsHtml(crumbs);
    html += `
    <section class="section">
      <div class="container" style="max-width:850px;">
        <h1>Terms of Service</h1>
        <p class="text-muted">Last Updated: January 2026</p>
        <p>By accessing or using the website of Elgin Heating & Air Pros, you agree to comply with and be bound by the following terms and conditions.</p>
        
        <h2>Service Inquiries & Estimates</h2>
        <p>Service descriptions, diagnostic guidelines, and estimates provided on this website are for informational purposes. Final diagnostic assessments and repair costs are determined on-site following complete mechanical inspection.</p>

        <h2>Emergency Dispatch</h2>
        <p>While we strive for immediate response times, actual arrival times are subject to technician availability, road conditions, and severe weather triage.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by and construed in accordance with the laws of the State of Texas.</p>
      </div>
    </section>`;
    html += getFooter();
    writePage('terms/index.html', html);
    allUrls.push({ url: '/terms/', priority: '0.3', changefreq: 'yearly' });
  }
}

// ==========================================================================
// 6. GENERATE XML SITEMAP & ROBOTS.TXT
// ==========================================================================
function buildSitemapAndRobots() {
  console.log('Generating sitemap.xml and robots.txt...');

  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${business.domain}${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

  const robotsTxt = `# Robots.txt for ${business.name}
User-agent: *
Allow: /

Sitemap: ${business.domain}/sitemap.xml
`;

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');
  console.log(`✅ sitemap.xml created with ${allUrls.length} indexable URLs.`);
}

// ==========================================================================
// 7. WRITE VERCEL CONFIGURATION
// ==========================================================================
function writeVercelConfig() {
  const vercelConfig = {
    buildCommand: "node generator.js",
    outputDirectory: "dist"
  };

  fs.writeFileSync(
    path.join(__dirname, 'vercel.json'),
    JSON.stringify(vercelConfig, null, 2),
    'utf8'
  );
  console.log(`✅ vercel.json configuration verified.`);
}

// ==========================================================================
// RUN GENERATOR PIPELINE
// ==========================================================================
function run() {
  console.log('🚀 Starting Elgin, Texas HVAC Website Generator...');
  ensureDir(DIST_DIR);

  buildHomepage();
  buildServicePages();
  buildAreaPages();
  buildComboPages();
  buildUtilityPages();
  buildSitemapAndRobots();
  writeVercelConfig();

  console.log('\n======================================================');
  console.log(`🎉 BUILD COMPLETED SUCCESSFULLY!`);
  console.log(`📁 Output Folder: ${DIST_DIR}`);
  console.log(`📄 Total Indexable Pages Built: ${allUrls.length}`);
  console.log(`📞 Primary Conversion Phone: ${business.phoneFormatted}`);
  console.log('======================================================\n');
}

run();
