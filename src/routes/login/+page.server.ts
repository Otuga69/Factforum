import { fail, redirect, type RequestHandler } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = (async ({ locals, url }) => {
    if (locals.pb.authStore.model) {
        return redirect(303, '/dashboard');
    }
    
    try {
        const authMethods = await locals.pb.collection('users').listAuthMethods();
        const failed = url.searchParams.get('fail') === 'true';
        
        // Access the providers correctly from authMethods
        const providers = authMethods.oauth2?.providers || [];
        
        return { providers, fail: failed };
    } catch (error) {
        console.error('Auth methods error:', error);
        return { providers: [], fail: true };
    }
}) satisfies PageServerLoad;
  
export const actions = {
  register: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    if (!email || !password) {
      return fail(400, { 
        emailRequired: !email, 
        passwordRequired: !password 
      });
    }

    data.set('passwordConfirm', password);

    try {
      await locals.pb.collection('users').create(data);
      await locals.pb.collection('users').authWithPassword(email, password);
      await locals.pb.collection('users').requestVerification(email);
    } catch (error) {
      const errorObj = error as ClientResponseError;
      return fail(500, { fail: true, message: errorObj.data.message });
    }

    throw redirect(303, '/dashboard');
  },
  login: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return fail(400, { emailRequired: email === null, passwordRequired: password === null });
    }

    try {
      await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
    } catch (error) {
      const errorObj = error as ClientResponseError;
      return fail(500, { fail: true, message: errorObj.data.message });
    }

    throw redirect(303, '/dashboard');
  },
  reset: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email');

    if (!email) {
      return fail(400, { emailRequired: true });
    }

    try {
      await locals.pb.collection('users').requestPasswordReset(email.toString());
    } catch (error) {
      const errorObj = error as ClientResponseError;
      return fail(500, { fail: true, message: errorObj.data.message });
    }
    throw redirect(303, '/login');
  },
  google: async ({ locals, cookies }) => {
    const authMethods = await locals.pb.collection('users').listAuthMethods();
    
    if (!authMethods.oauth2?.providers) {
        return fail(500, { fail: true, message: 'OAuth2 providers not available' });
    }
  
    const provider = authMethods.oauth2.providers.find((p) => p.name === 'google');
    
    if (!provider) {
        return fail(500, { fail: true, message: 'Google provider not found' });
    }
  
    cookies.set('provider', JSON.stringify(provider), { 
        httpOnly: true, 
        path: `/auth/callback/google`,
        sameSite: 'lax'
    });

    const redirectURL = `${provider.authURL}${env.REDIRECT_URL}${provider.name}`;
    throw redirect(303, redirectURL);
  },
  logout: async ({ locals }) => {
    await locals.pb.authStore.clear();
    throw redirect(303, '/login');
  }
};