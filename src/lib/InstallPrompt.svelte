<script>
    import { browser } from '$app/environment'
    import { onMount } from 'svelte'

    let deferredPrompt = $state(null)
    let showInstallButton = $state(false)
    let showInstructions = $state(false)
    let isStandalone = $state(false)
    let isIOS = $state(false)
    let isAndroid = $state(false)

    // Capture the event globally in case it fires before component mounts
    if (browser && !window.__pwaPromptCaptured) {
        window.__pwaPromptCaptured = true
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault()
            window.__deferredPwaPrompt = e
        })
    }

    onMount(() => {
        if (!browser) return

        // Check if already installed as PWA
        isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true

        if (isStandalone) return // Already installed, don't show button

        // Detect platform
        isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        isAndroid = /Android/.test(navigator.userAgent)

        // Show button on mobile devices
        if (isIOS || isAndroid) {
            showInstallButton = true
        }

        // Check if beforeinstallprompt was already captured (Android/Chrome)
        if (window.__deferredPwaPrompt) {
            deferredPrompt = window.__deferredPwaPrompt
            showInstallButton = true
        }

        // Listen for future beforeinstallprompt events
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault()
            deferredPrompt = e
            showInstallButton = true
        })

        // Hide when installed
        window.addEventListener('appinstalled', () => {
            showInstallButton = false
            deferredPrompt = null
        })
    })

    async function handleInstall() {
        if (deferredPrompt) {
            // Android/Chrome - trigger native prompt
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted') {
                showInstallButton = false
            }
            deferredPrompt = null
        } else {
            // Show manual instructions
            showInstructions = true
        }
    }

    function closeInstructions() {
        showInstructions = false
    }
</script>

{#if showInstallButton && !isStandalone}
    <button
        onclick={handleInstall}
        class="p-3 md:p-4 bg-bg-card border border-white/10 rounded-full text-primary/60 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
        title="Install App"
    >
        <svg
            class="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
        </svg>
    </button>
{/if}

{#if showInstructions}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
        class="fixed inset-0 z-60 bg-black/80 flex items-end justify-center p-4"
        onclick={closeInstructions}
        onkeydown={(e) => e.key === 'Escape' && closeInstructions()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="bg-bg-card rounded-2xl p-6 max-w-sm w-full space-y-4 mb-8"
            onclick={(e) => e.stopPropagation()}
            onkeydown={(e) => e.stopPropagation()}
        >
            <h3 class="text-lg font-bold text-text-main text-center">
                Install App
            </h3>

            {#if isIOS}
                <p class="text-sm text-text-dim text-center">
                    To install this app on your iPhone/iPad:
                </p>
                <ol class="space-y-3 text-sm text-text-main">
                    <li class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">1</span>
                        <span>Tap the <strong>Share</strong> button at the bottom</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">2</span>
                        <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">3</span>
                        <span>Tap <strong>"Add"</strong> to install</span>
                    </li>
                </ol>
            {:else}
                <p class="text-sm text-text-dim text-center">
                    To install this app on your device:
                </p>
                <ol class="space-y-3 text-sm text-text-main">
                    <li class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">1</span>
                        <span>Tap the <strong>menu</strong> button (3 dots) in Chrome</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">2</span>
                        <span>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">3</span>
                        <span>Tap <strong>"Install"</strong> to confirm</span>
                    </li>
                </ol>
            {/if}

            <button
                onclick={closeInstructions}
                class="w-full py-3 bg-primary text-bg-dark rounded-xl font-medium cursor-pointer hover:bg-primary-hover transition-colors"
            >
                Got it
            </button>
        </div>
    </div>
{/if}
