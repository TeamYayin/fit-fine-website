import { test } from 'node:test';
import assert from 'node:assert';
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


