<script lang="ts">
    import * as config from '$lib/config'
</script>

<footer class="footer">
    <div class="container">
        <p>{config.title} &copy; {new Date().getFullYear()}</p>
    </div>
</footer>

<style>
    .footer {
        border-top: 1px solid#e7e7e7;
        padding: 16px 0;
        margin-top: 32px;
    }

    .container {
        max-width: 800px;
        margin-inline: auto;
        padding-inline: 16px;
    }

    p {
        color: #666;
        font-size: 14px;
        margin: 0;
    }
</style>
