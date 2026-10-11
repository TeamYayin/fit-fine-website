import { onRequestPost, onRequestOptions } from '../functions/api/contact.js';

export default {
  /**
   * Cloudflare Worker fetch handler with Static Assets support
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route /api/contact requests to the contact function handler
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (request.method === 'OPTIONS') {
        return onRequestOptions();
      }
      if (request.method === 'POST') {
        return onRequestPost({ request, env });
      }
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Delegate all static page routes to Cloudflare Static Assets
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};

