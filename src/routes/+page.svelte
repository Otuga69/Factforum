<script lang="ts">
  import * as config from '$lib/config';
  import { formatDate } from '$lib/utils';
  export let data;
</script>

<svelte:head>
  <title>{config.title}</title>
</svelte:head>

<section>
  <nav class="container"> 
    <ul class="posts">
      {#each data.posts as post}
        <li class="post">
          <a href={post.slug} class="post-title">{post.title}</a>
          <p class="post-date">{formatDate(post.date)}</p>
          <p class="post-description">{post.description}</p>
        </li>
      {/each}
    </ul>
  </nav>
  
</section>



<style>
  .container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 2rem);
}

/* Post Styles */
.posts {
  display: grid;
  gap: 2rem;
  padding: 2rem 0;
}

.post {
  padding: 1.5rem;
  border-radius: 10px;
  background:#3d3d3d;
  transition: transform 0.2s ease;
}

.post:hover {
  transform: translateY(-2px);
}

.post-title {
  font-size: 1.5rem;
  color:#bd3636;
  margin-bottom: 0.5rem;
}

.post-date {
  font-size: 0.875rem;
  color:#000000;
}

.post-description {
  margin-top: 1rem;
  color:#000000;
  line-height: 1.6;
}
</style>
