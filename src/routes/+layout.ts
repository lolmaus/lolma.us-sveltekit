import { redirect } from '@sveltejs/kit';

export const prerender = true;

export async function load({ url }) {
  if(url.pathname === '/') {
    return redirect(301, '/en/');
  }
}