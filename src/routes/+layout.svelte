<script>
    import favicon from '$lib/assets/favicon.svg'
    import { onMount } from 'svelte'
    import '../app.css'

    let { children } = $props()

    onMount(async () => {
        if ('serviceWorker' in navigator) {
            const { registerSW } = await import('virtual:pwa-register')
            registerSW({ immediate: true })
        }
    })
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#121212" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Riyad-us-Salihin" />
    <title>Riyad-us-Salihin - Gardens of the Righteous</title>
</svelte:head>

<main class="min-h-screen">
    {@render children()}
</main>
