<script>
    import { fly, fade } from 'svelte/transition'
    import { tick } from 'svelte'

    /**
     * @typedef {Object} ChapterEntry
     * @property {number} id
     * @property {string} title
     * @property {string} arabicTitle
     * @property {number} firstNumber
     * @property {number} lastNumber
     */

    let {
        open = $bindable(false),
        chapters = /** @type {ChapterEntry[]} */ ([]),
        currentChapterId = 0,
        onSelect = /** @type {(chapterId: number) => void} */ (() => {}),
    } = $props()

    let filterQuery = $state('')
    /** @type {HTMLDivElement | undefined} */
    let listEl = $state()

    let filtered = $derived.by(() => {
        const q = filterQuery.trim().toLowerCase()
        if (!q) return chapters
        return chapters.filter(
            (c) =>
                c.title.toLowerCase().includes(q) ||
                c.arabicTitle.toLowerCase().includes(q),
        )
    })

    $effect(() => {
        if (!open) return
        // Reset filter and scroll current chapter into view
        ;(async () => {
            filterQuery = ''
            await tick()
            const el = listEl?.querySelector(
                `[data-chapter-id="${currentChapterId}"]`,
            )
            if (el && 'scrollIntoView' in el) {
                /** @type {HTMLElement} */ (el).scrollIntoView({
                    block: 'center',
                })
            }
        })()
    })

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (!open) return
        if (e.key === 'Escape') {
            open = false
        }
    }

    /** @param {number} chapterId */
    function selectChapter(chapterId) {
        onSelect(chapterId)
        open = false
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
    <!-- Backdrop -->
    <button
        type="button"
        aria-label="Close contents"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-default"
        onclick={() => (open = false)}
        transition:fade={{ duration: 200 }}
    ></button>

    <!-- Drawer -->
    <aside
        aria-label="Table of contents"
        class="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-bg-card border-r border-white/10 shadow-2xl z-50 flex flex-col"
        transition:fly={{ x: -360, duration: 250, opacity: 1 }}
    >
        <!-- Header -->
        <div
            class="flex items-center justify-between px-5 py-4 border-b border-white/10"
        >
            <div>
                <p
                    class="text-[10px] uppercase tracking-[0.2em] text-text-dim font-bold"
                >
                    Contents
                </p>
                <p class="text-sm text-text-main/80 mt-0.5">
                    {chapters.length} chapters
                </p>
            </div>
            <button
                onclick={() => (open = false)}
                aria-label="Close contents"
                class="p-2 text-text-dim hover:text-primary transition-colors cursor-pointer"
            >
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>

        <!-- Filter -->
        <div class="px-5 py-3 border-b border-white/5">
            <div class="relative">
                <input
                    bind:value={filterQuery}
                    type="text"
                    placeholder="Filter chapters..."
                    class="w-full bg-bg-dark border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-text-dim/50"
                />
                <svg
                    class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>
        </div>

        <!-- List -->
        <div bind:this={listEl} class="flex-1 overflow-y-auto">
            {#if filtered.length === 0}
                <div class="p-6 text-center text-text-dim/50 text-sm italic">
                    No chapters match "{filterQuery}"
                </div>
            {:else}
                {#each filtered as chapter (chapter.id)}
                    {@const isCurrent = chapter.id === currentChapterId}
                    <button
                        type="button"
                        data-chapter-id={chapter.id}
                        onclick={() => selectChapter(chapter.id)}
                        class="cursor-pointer w-full text-left px-5 py-3 border-b border-white/5 hover:bg-white/5 transition-colors flex items-start gap-3 {isCurrent
                            ? 'bg-primary/10'
                            : ''}"
                    >
                        <span
                            class="text-xs font-mono shrink-0 mt-0.5 w-8 text-right {isCurrent
                                ? 'text-primary'
                                : 'text-text-dim/40'}"
                        >
                            {chapter.id}.
                        </span>
                        <span class="flex-1 min-w-0">
                            <span
                                class="block text-sm font-medium {isCurrent
                                    ? 'text-primary'
                                    : 'text-text-main'} line-clamp-2"
                            >
                                {chapter.title.replace(/^Chapter \d+:\s*/, '')}
                            </span>
                            <span class="flex items-baseline justify-between gap-2 mt-1.5">
                                <span
                                    class="arabic text-sm text-primary/70 line-clamp-1 text-left"
                                >
                                    {chapter.arabicTitle}
                                </span>
                                <span
                                    class="text-xs font-mono text-text-dim/60 shrink-0"
                                >
                                    {#if chapter.firstNumber === chapter.lastNumber}
                                        #{chapter.firstNumber}
                                    {:else}
                                        #{chapter.firstNumber}–{chapter.lastNumber}
                                    {/if}
                                </span>
                            </span>
                        </span>
                    </button>
                {/each}
            {/if}
        </div>
    </aside>
{/if}
