<script lang="ts">
    import { cookieParse } from 'pocketbase';
    import type { ActionData, PageData } from './$types';
    import type { AuthProviderInfo } from 'pocketbase';
    
    export let form: ActionData;
    export let data: PageData & {
        providers: AuthProviderInfo[];
        fail: boolean;
    };
</script>

<div class="min-h-full flex flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {#if form?.fail}
            <div class="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {form.message}
            </div>
        {/if}

        <form class="space-y-6" action="?/login" method="post">
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-white">
                    Email address
                </label>
                <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" required 
                           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="mail@example.com" />
                </div>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium leading-6 text-white">
                    Password
                </label>
                <div class="mt-2">
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="••••••" />
                </div>
            </div>

            <div class="flex items-center justify-end">
                <button type="button" formnovalidate formaction="?/reset" 
                        class="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                </button>
            </div>

            <div>
                <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign in
                </button>
            </div>

            <button formaction="?/register" type="button"
                    class="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                Register
            </button>
        </form>

        {#if data.providers && data.providers.length}
            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-600"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="bg-gray-900 px-2 text-gray-300">Or continue with</span>
                    </div>
                </div>

                <div class="mt-6 space-y-2">
                    {#each data.providers as provider}
                        <form action="?/google" method="POST">
                            <button type="submit"
                                    class="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                {provider.name}
                            </button>
                        </form>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>