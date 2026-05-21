<script>
    import { LANGUAGES, saveLanguagePreference, ui } from '$lib/translations/index.js'

    let {
        lang = $bindable('en'),
    } = $props()

    let open = $state(false)
    /** @type {HTMLDivElement | undefined} */
    let menuRef = $state()

    function select(code) {
        lang = code
        open = false
    }

    $effect(() => {
        if (!open) return
        /** @param {MouseEvent} e */
        function onDocClick(e) {
            if (menuRef && e.target instanceof Node && !menuRef.contains(e.target)) {
                open = false
            }
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    })
</script>

<div bind:this={menuRef} class="relative" dir="ltr">
    <button
        onclick={() => (open = !open)}
        class="p-3 md:p-4 bg-bg-card border border-white/10 rounded-full text-primary/60 hover:text-primary hover:border-primary/30 transition-all cursor-pointer text-xs md:text-sm font-medium"
        title={ui('changeLanguage', lang)}
    >
    {LANGUAGES.find((l) => l.code === lang)?.shortLabel ?? lang.toUpperCase()}
</button>

    {#if open}
        <div
            class="absolute right-0 top-full mt-2 w-40 bg-bg-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
            {#each LANGUAGES as l}
                <button
                    onclick={() => select(l.code)}
                    class="cursor-pointer w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors {lang === l.code
                        ? 'text-primary bg-primary/10 font-medium'
                        : 'text-text-dim'}"
                >
                    {l.shortLabel} - {l.label}
                </button>
            {/each}
        </div>
    {/if}
</div>
