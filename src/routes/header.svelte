<script lang="ts">
    import { goto } from '$app/navigation';
    import * as config from '$lib/config';
    

    function goToLogin() {
        goto('/login');
    }

    function goToSignup() {
        goto('/signup');
    }
</script>

<nav class="container">
    <a href="/" class="title">
        <b>{config.title}</b>
    </a>
  
    <ul class="nav-links">
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/rss.xml" target="_blank">RSS</a></li>
    </ul>
    
    <div class="auth-buttons">
        <button class="button" on:click={goToLogin}>Login</button>
        <button class="button" on:click={goToSignup}>Sign Up</button>
        
    </div>
</nav>

  

<style>
    .container {
      max-width: 800px;
      margin-inline: auto;
      padding-block: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
  }

  .title {
      font-size: 24px;
      color:#fc0303;
      text-decoration: none;
  }

  .nav-links {
      display: flex;
      gap: 32px;
      margin: 0;
  }

  .nav-links a {
      color: #666;
      text-decoration: none;
      transition: color 0.2s;
  }

  .nav-links a:hover {
      color: #000000;
  }

  .auth-buttons {
    display: flex;
    gap: 10px; /* Adjust the space between buttons */
}


  
</style>
