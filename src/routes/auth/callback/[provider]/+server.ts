import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ locals, url, cookies, params }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const providerCookie = cookies.get('provider');

    if (!code || !providerCookie) {
        console.error('Missing code or provider cookie');
        throw redirect(303, '/login?fail=true&reason=missing_params');
    }

    try {
        const provider = JSON.parse(providerCookie);

        // Make sure we're using the correct redirect URL format
        const redirectUrl = `${env.REDIRECT_URL}${provider.name}`;
        
        await locals.pb.collection('users').authWithOAuth2Code(
            provider.name,
            code,
            provider.codeVerifier,
            redirectUrl,
            {
                emailVisibility: true,
            }
        );

        // Clean up cookies
        cookies.delete('provider', { path: `/auth/callback/${params.provider}` });
        
        throw redirect(303, '/dashboard');
    } catch (error) {
        console.error('OAuth2 Error:', error);
        cookies.delete('provider', { path: `/auth/callback/${params.provider}` });
        throw redirect(303, '/login?fail=true&reason=auth_failed');
    }
};