import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Cloudflare Inertia App', () => {
	describe('Homepage', () => {
		it('/ responds with HTML containing app div (unit style)', async () => {
			const request = new Request('http://example.com/');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
			
			const html = await response.text();
			expect(html).toContain('<div id="app"');
			expect(html).toContain('data-page=');
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
		it('/about responds with HTML', async () => {
			const request = new Request('http://example.com/about');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
		});
	});

	describe('Users page', () => {
		it('/users responds with HTML', async () => {
			const request = new Request('http://example.com/users');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
		});
	});

	describe('Individual user page', () => {
		it('/users/1 responds with HTML', async () => {
			const request = new Request('http://example.com/users/1');
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(response.headers.get('content-type')).toContain('text/html');
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
