<script lang="ts">
	import { formatDate } from '$lib/utils'
	import { ThumbsUp } from 'lucide-svelte';
	import type { PostData } from '$lib/types';

	let { data } = $props<{ data: PostData }>()
	let likes = $state(data.likes)
	let isLiked = $state(false)

	function handleLike() {
		if (!isLiked) {
				likes = likes + 1
				isLiked = true
		} else {
				likes = likes - 1
				isLiked = false
		}
	}
	
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>

		<hgroup >
			<h1>{data.meta.title}</h1>
			<p>Published at {formatDate(data.meta.date)}</p>
			<div class="headline">
				{#each data.meta.categories as category}
					<span class="surface-4">&num;{category}</span>
				{/each}
				
			</div>
				
		
		</hgroup>

	

	<div class="prose">
		<data.content />
	</div>

	<button 
		onclick={handleLike}
		class="flex items-center gap-1 w-fit mt-4 px-3 py-1.5 rounded-full border-2 border-[#161616] hover:bg-[#27272a] transition-colors duration-300 group"
	>
		
		<div class="relative">
			<ThumbsUp 
				size={16} 
				class="transition-transform duration-300 stroke-[#000000] {isLiked ? 'scale-110 fill-[#e22222] stroke-[#000000]' : 'group-hover:scale-105'}"
			/>
		</div>
		<span class="min-w-[16px] text-xs">
			{likes}
		</span>
	</button>
</article>

<style>
	article {
		flex-basis: 320px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: #16191d;
		border: 1px solid #1a1a1a;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-inline-size: 800px; /* Approximation of --size-content-3 */
		margin-inline: auto;

		animation: var(--animation-float);

		h1 {
			text-transform: capitalize;
		}

		h1 + p {
			margin-top: 8px; /* Approximation of --size-2 */
			color: #e22222; /* Approximation of --text-2 */
		}

		.headline {
			border-bottom: 1px solid #0c0c0c;
			padding: 16px 0;
			margin-bottom: 32px;

			display: flex;
			gap: 16px; /* Approximation of --size-3 */
			margin-top: 8px; /* Reduced spacing to fix gap */

			> * {
				padding: 8px 12px; /* Approximation of --size-2 and --size-3 */
				border-radius: 50px; /* Approximation of --radius-round */
			}
		}

		
	}
	
</style>

