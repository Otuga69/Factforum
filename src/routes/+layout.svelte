<script lang="ts">
	import Footer from './footer.svelte'
	import Header from './header.svelte'
	import '../app.css'
          import PageTransition from './transition.svelte'
          
	export let children
	export let data
	
	
</script>
      
<div class="layout">
	<Header />
	<main class="main-content">
            <PageTransition url={data.url}>
	    {@render children?.()}
	  </PageTransition>
	</main>
	<Footer />
</div>
      
<style>
	.layout {
	    min-height: 100vh;
	    display: grid;
	    grid-template-rows: auto 1fr auto;
	}
  
	.main-content {
	    width: 100%;
	    max-width: 1000px;
	    margin-inline: auto;
	    padding: 32px 16px;
	}
</style>