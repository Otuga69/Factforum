<script lang="ts">
	import { formatDate } from '$lib/utils'

	let { data } = $props()
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	article {
		max-inline-size: 800px; /* Approximation of --size-content-3 */
		margin-inline: auto;

		h1 {
			text-transform: capitalize;
		}

		h1 + p {
			margin-top: 8px; /* Approximation of --size-2 */
			color: #666; /* Approximation of --text-2 */
		}

		.tags {
			display: flex;
			gap: 16px; /* Approximation of --size-3 */
			margin-top: 32px; /* Approximation of --size-7 */

			> * {
				padding: 8px 12px; /* Approximation of --size-2 and --size-3 */
				border-radius: 50px; /* Approximation of --radius-round */
			}
		}
	}
</style>
