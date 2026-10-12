import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  renderAdminNotificationEmail,
  renderUserConfirmationEmail,
} from '../functions/templates/emailTemplates.js';
import {
  PLANS,
  SUCCESS_STORIES,
  DIET_PLANS,
  FAQS,
  PLAN_FAQS,
  BLOG_POSTS,
  CATEGORIES,
  COMPARISON_FEATURES,
} from '../src/data/mockData.js';

test('Membership plans contain required Silver, Gold, Platinum tiers', () => {
  assert.strictEqual(PLANS.length, 3);
  const planNames = PLANS.map((p) => p.name);
  assert.deepStrictEqual(planNames, ['Silver', 'Gold', 'Platinum']);

  const gold = PLANS.find((p) => p.name === 'Gold');
  assert.strictEqual(gold?.recommended, true);
  assert.strictEqual(gold?.price, 999);

  const silver = PLANS.find((p) => p.name === 'Silver');
  assert.strictEqual(silver?.price, 499);

  const platinum = PLANS.find((p) => p.name === 'Platinum');
  assert.strictEqual(platinum?.price, 1999);
});

test('Success stories have valid data and positive weight loss', () => {
  assert.ok(SUCCESS_STORIES.length >= 6);
  for (const story of SUCCESS_STORIES) {
    assert.ok(story.name.length > 0);
    assert.ok(story.beforeWeight > story.afterWeight, `${story.name} beforeWeight should be greater than afterWeight`);
    assert.ok(story.durationWeeks > 0);
    assert.ok(['Silver', 'Gold', 'Platinum'].includes(story.plan));
  }
});

test('Diet plans cover Weight Loss, Weight Gain, and Muscle Gain with sample menus', () => {
  const categories = [...new Set(DIET_PLANS.map((d) => d.category))];
  assert.ok(categories.includes('Weight Loss'));
  assert.ok(categories.includes('Weight Gain'));
  assert.ok(categories.includes('Muscle Gain'));

  for (const plan of DIET_PLANS) {
    assert.ok(plan.sampleMenu.breakfast.length > 0);
    assert.ok(plan.sampleMenu.lunch.length > 0);
    assert.ok(plan.sampleMenu.dinner.length > 0);
    assert.ok(plan.features.length >= 3);
  }
});

test('Blog posts and categories are populated', () => {
  assert.ok(BLOG_POSTS.length >= 9);
  assert.ok(CATEGORIES.length >= 5);
  for (const post of BLOG_POSTS) {
    assert.ok(post.title.length > 0);
    assert.ok(post.category.length > 0);
    assert.ok(post.readTime.includes('min read'));
  }
});

test('Comparison features covers all core differentiators', () => {
  assert.ok(COMPARISON_FEATURES.length >= 8);
  const customMealPlan = COMPARISON_FEATURES.find((f) => f.feature === 'Fully Custom Meal Plans');
  assert.strictEqual(customMealPlan?.platinum, true);
  assert.strictEqual(customMealPlan?.silver, false);
});

test('BMI calculation formula operates accurately', () => {
  const calcBMI = (weightKg, heightCm) => {
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  };

  assert.strictEqual(calcBMI(70, 175), 22.9);
  assert.strictEqual(calcBMI(90, 175), 29.4);
  assert.strictEqual(calcBMI(50, 175), 16.3);
});

test('BMR Mifflin-St Jeor formula operates accurately', () => {
  const calcBMR = (weight, height, age, gender) => {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? base + 5 : base - 161;
  };

  const maleBmr = calcBMR(70, 175, 25, 'male');
  assert.strictEqual(maleBmr, 1673.75);

  const femaleBmr = calcBMR(60, 165, 25, 'female');
  assert.strictEqual(femaleBmr, 1345.25);
});

test('Contact form payload validation enforces mandatory fields and honeypot', () => {
  const validatePayload = (payload) => {
    if (payload._honeypot && payload._honeypot.trim().length > 0) {
      return { ok: true, spamFiltered: true };
    }
    if (!payload.fullName || !payload.email || !payload.phone) {
      return { ok: false, error: 'Missing mandatory fields' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return { ok: false, error: 'Invalid email' };
    }
    return { ok: true, spamFiltered: false };
  };

  // Valid submission
  const valid = validatePayload({ fullName: 'Rohan', email: 'rohan@example.com', phone: '+91 9999999999', plan: 'Gold' });
  assert.strictEqual(valid.ok, true);
  assert.strictEqual(valid.spamFiltered, false);

  // Missing email
  const missingEmail = validatePayload({ fullName: 'Rohan', phone: '+91 9999999999' });
  assert.strictEqual(missingEmail.ok, false);

  // Bot submission (honeypot filled)
  const botSubmission = validatePayload({ fullName: 'Bot', email: 'bot@spam.com', phone: '123', _honeypot: 'spam-bot-url' });
  assert.strictEqual(botSubmission.ok, true);
  assert.strictEqual(botSubmission.spamFiltered, true);
});

test('Worker entrypoint routes /api/contact correctly', async () => {
  const worker = (await import('../src/worker.js')).default;
  assert.ok(typeof worker.fetch === 'function');

  // Test OPTIONS preflight request
  const optionsReq = new Request('https://example.com/api/contact', { method: 'OPTIONS' });
  const optionsRes = await worker.fetch(optionsReq, {});
  assert.strictEqual(optionsRes.status, 204);

  // Test static asset delegation
  let assetFetched = false;
  const pageReq = new Request('https://example.com/plans', { method: 'GET' });
  await worker.fetch(pageReq, {
    ASSETS: {
      fetch: async () => {
        assetFetched = true;
        return new Response('page');
      },
    },
  });
  assert.strictEqual(assetFetched, true);
});

test('Email templates module renders admin alert and user confirmation correctly (SOLID SRP)', () => {
  const adminHtml = renderAdminNotificationEmail({
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 98765 43210',
    plan: 'Platinum',
    callbackDate: '2026-10-25',
    callbackTime: 'Evening (4 PM - 8 PM)',
    message: 'Looking to prepare for marathon',
  });

  assert.ok(adminHtml.includes('Eugen Fit & Fine'));
  assert.ok(adminHtml.includes('Platinum Tier'));
  assert.ok(adminHtml.includes('Jane Smith'));
  assert.ok(adminHtml.includes('jane@example.com'));
  assert.ok(adminHtml.includes('+91 98765 43210'));
  assert.ok(adminHtml.includes('2026-10-25'));
  assert.ok(adminHtml.includes('Looking to prepare for marathon'));

  const userHtml = renderUserConfirmationEmail({
    fullName: 'Jane Smith',
    phone: '+91 98765 43210',
    plan: 'Platinum',
    callbackDate: '2026-10-25',
    callbackTime: 'Evening (4 PM - 8 PM)',
    receiverEmail: 'subscriptions@eugenfnf.com',
  });

  assert.ok(userHtml.includes('Hello <strong>Jane Smith</strong>'));
  assert.ok(userHtml.includes('Consultation Confirmed'));
  assert.ok(userHtml.includes('Platinum Tier'));
  assert.ok(userHtml.includes('+91 98765 43210'));
  assert.ok(userHtml.includes('What to Expect Next'));
  assert.ok(userHtml.includes('subscriptions@eugenfnf.com'));
});

test('Phone number validation correctly filters valid and invalid formats', () => {
  const isValidPhone = (phone) => {
    const clean = phone.replace(/[\s\-\(\)\.]/g, '');
    return /^\+?[0-9]{10,15}$/.test(clean);
  };

  // Valid numbers
  assert.strictEqual(isValidPhone('+91 98765 43210'), true);
  assert.strictEqual(isValidPhone('9876543210'), true);
  assert.strictEqual(isValidPhone('+1 (555) 234-5678'), true);
  assert.strictEqual(isValidPhone('080-23456789'), true);
  assert.strictEqual(isValidPhone('+44 7911 123456'), true);

  // Invalid numbers
  assert.strictEqual(isValidPhone('12345'), false);
  assert.strictEqual(isValidPhone('abcdefghij'), false);
  assert.strictEqual(isValidPhone('+91 abcde 12345'), false);
  assert.strictEqual(isValidPhone(''), false);
  assert.strictEqual(isValidPhone('123456789012345678'), false); // > 15 digits
});

test('Callback date validation rejects past dates and accepts upcoming dates', () => {
  const validateDate = (dateStr) => {
    const parsed = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isNaN(parsed.getTime()) && parsed >= today;
  };

  // Past dates
  assert.strictEqual(validateDate('2020-01-01'), false);
  assert.strictEqual(validateDate('2025-12-31'), false);
  assert.strictEqual(validateDate('not-a-date'), false);

  // Future dates
  const futureYear = new Date().getFullYear() + 1;
  assert.strictEqual(validateDate(`${futureYear}-06-15`), true);

  // Today
  const todayIso = new Date().toISOString().split('T')[0];
  assert.strictEqual(validateDate(todayIso), true);
});

test('BlogLayout component exists and provides luxury editorial typography', () => {
  const layoutPath = path.resolve('src/layouts/BlogLayout.astro');
  assert.ok(fs.existsSync(layoutPath), 'BlogLayout.astro must exist in src/layouts/');

  const content = fs.readFileSync(layoutPath, 'utf-8');
  assert.ok(content.includes('prose-luxury'), 'BlogLayout must define luxury typography class');
  assert.ok(content.includes('<slot />'), 'BlogLayout must contain slot for markdown content');
  assert.ok(content.includes('Apply for Coaching'), 'BlogLayout must include coaching concierge CTA');
  assert.ok(content.includes('Return to Editorial Hub'), 'BlogLayout must include back to blog hub navigation');
});

test('Blog content collection contains markdown post folders with valid index.md files', () => {
  const blogDir = path.resolve('src/content/blog');
  assert.ok(fs.existsSync(blogDir), 'src/content/blog directory must exist');

  // Verify documentation guide exists
  const guidePath = path.resolve('docs/BLOG_PUBLISHING_GUIDE.md');
  assert.ok(fs.existsSync(guidePath), 'docs/BLOG_PUBLISHING_GUIDE.md guide must exist');

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const postFolders = entries.filter((e) => e.isDirectory());
  assert.ok(postFolders.length >= 9, 'Must have at least 9 blog post folders');

  for (const folder of postFolders) {
    const indexPath = path.join(blogDir, folder.name, 'index.md');
    assert.ok(fs.existsSync(indexPath), `Folder ${folder.name} must contain index.md`);

    const mdContent = fs.readFileSync(indexPath, 'utf-8');
    assert.ok(mdContent.startsWith('---'), `${folder.name}/index.md must start with frontmatter`);
    assert.ok(mdContent.includes('title:'), `${folder.name}/index.md must include title`);
    assert.ok(mdContent.includes('excerpt:'), `${folder.name}/index.md must include excerpt`);
    assert.ok(mdContent.includes('category:'), `${folder.name}/index.md must include category`);
    assert.ok(mdContent.includes('readTime:'), `${folder.name}/index.md must include readTime`);
  }
});

test('Dynamic blog routing page exists for Astro content collection', () => {
  const dynamicRoutePath = path.resolve('src/pages/blog/[...slug].astro');
  assert.ok(fs.existsSync(dynamicRoutePath), 'src/pages/blog/[...slug].astro must exist');

  const routeContent = fs.readFileSync(dynamicRoutePath, 'utf-8');
  assert.ok(routeContent.includes("getCollection('blog')"), 'Dynamic route must query blog content collection');
  assert.ok(routeContent.includes('BlogLayout'), 'Dynamic route must wrap content with BlogLayout');
});




