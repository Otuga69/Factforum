<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
                <p class="text-gray-700 font-medium">{data.user.email}</p>
                <form action="/login?/logout" method="post">
                    <button 
                        type="submit"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                    >
                        Log Out
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>