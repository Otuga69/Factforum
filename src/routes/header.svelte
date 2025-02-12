<script lang="ts">
    import * as config from '$lib/config'
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
  
    <button class="theme-toggle">Toggle</button>
  </nav>

<style>
    .container {
      max-width: 800px;
      margin-inline: auto;
      padding-block: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
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

  .theme-toggle {
      padding: 8px 16px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background: #f0f0f0;
      color: #333;
      cursor: pointer;
  }
</style>
