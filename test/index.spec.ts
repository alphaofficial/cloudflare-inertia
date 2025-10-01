import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

function extractInertiaPageData(html: string) {
	const match = html.match(/data-page="([^"]+)"/);
	if (!match) return null;
	return JSON.parse(decodeURIComponent(match[1].replace(/&quot;/g, '"')));
}

describe('Cloudflare Inertia App', () => {
	describe('Homepage', () => {
		it('serves correct Inertia.js context for Home page', async () => {
			const request = new Request('http://example.com/');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
			
			const html = await response.text();
			expect(html).toContain('<div id="app"');
			expect(html).toContain('data-page=');
			
			const pageData = extractInertiaPageData(html);
			expect(pageData).toBeTruthy();
			expect(pageData.component).toBe('Home');
			expect(pageData.props.message).toBe('Welcome to Cloudflare Workers with Inertia.js!');
			expect(pageData.props.timestamp).toBeTruthy();
			expect(typeof pageData.props.timestamp).toBe('string');
		});

		it('/ responds with HTML (integration style)', async () => {
			const request = new Request('http://example.com/');
			const response = await SELF.fetch(request);
			
			expect(response.status).toBe(200);
			const html = await response.text();
			expect(html).toContain('<div id="app"');
		});
	});

	describe('About page', () => {
		it('serves correct Inertia.js context for About page', async () => {
			const request = new Request('http://example.com/about');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
			
			const html = await response.text();
			const pageData = extractInertiaPageData(html);
			expect(pageData).toBeTruthy();
			expect(pageData.component).toBe('About');
			expect(pageData.props.title).toBe('About Us');
			expect(pageData.props.description).toBe('This is an Inertia.js app running on Cloudflare Workers with Hono.');
		});
	});

	describe('Users page', () => {
		it('serves correct Inertia.js context for Users page', async () => {
			const request = new Request('http://example.com/users');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
			
			const html = await response.text();
			const pageData = extractInertiaPageData(html);
			expect(pageData).toBeTruthy();
			expect(pageData.component).toBe('Users');
			expect(Array.isArray(pageData.props.users)).toBe(true);
			expect(pageData.props.users).toHaveLength(2);
			expect(pageData.props.users[0]).toEqual({
				id: 1,
				name: 'John Doe',
				email: 'john@example.com'
			});
			expect(pageData.props.users[1]).toEqual({
				id: 2,
				name: 'Jane Smith',
				email: 'jane@example.com'
			});
		});
	});

	describe('Individual user page', () => {
		it('serves correct Inertia.js context for User page', async () => {
			const request = new Request('http://example.com/users/1');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
			
			const html = await response.text();
			const pageData = extractInertiaPageData(html);
			expect(pageData).toBeTruthy();
			expect(pageData.component).toBe('User');
			expect(pageData.props.user).toEqual({
				id: 1,
				name: 'John Doe',
				email: 'john@example.com'
			});
		});

		it('/users/999 responds with 404', async () => {
			const request = new Request('http://example.com/users/999');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(404);
		});
	});

	describe('Assets', () => {
		it('serves CSS files', async () => {
			const request = new Request('http://example.com/main.css');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/css');
		});
	});
});
