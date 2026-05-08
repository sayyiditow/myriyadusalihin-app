<script>
    import { browser } from '$app/environment'
    import { riyadusSalihin } from '$lib/content.js'
    import { searchHadiths } from '$lib/search.js'
    import InstallPrompt from '$lib/InstallPrompt.svelte'
    import ChaptersDrawer from '$lib/ChaptersDrawer.svelte'
    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'

    let searchQuery = $state('')
    let previousSearchQuery = ''

    // Flatten all hadiths for easy navigation. isFirstInChapter lets the
    // reader render intro verses at the start of every chapter, not just
    // the very first hadith.
    const allHadiths = riyadusSalihin.flatMap((chapter) =>
        chapter.hadiths.map((h, idx) => ({
            ...h,
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            arabicChapterTitle: chapter.arabicTitle,
            introVerses: chapter.introVerses,
            isFirstInChapter: idx === 0,
        })),
    )

    // Compact chapter list for the drawer (title + arabic + hadith range).
    const chapterEntries = riyadusSalihin.map((c) => ({
        id: c.id,
        title: c.title,
        arabicTitle: c.arabicTitle,
        firstNumber: c.hadiths[0]?.number ?? 0,
        lastNumber: c.hadiths.at(-1)?.number ?? 0,
    }))

    let chaptersOpen = $state(false)

    let filteredHadiths = $derived(
        searchQuery.trim() === ''
            ? allHadiths
            : searchHadiths(searchQuery, riyadusSalihin),
    )

    let currentIndex = $state(0)
    let currentHadith = $derived(filteredHadiths[currentIndex])

    // Reading progress - 3 slots system
    const STORAGE_KEY = 'riyadusSalihin_reading_slots'
    const MAX_SLOTS = 3

    /** @type {{ hadithNumber: number, chapter: string, timestamp: number }[]} */
    let readingSlots = $state([])
    let activeSlotIndex = $state(0)
    let showBookmarkMenu = $state(false)
    /** @type {HTMLDivElement | undefined} */
    let bookmarkRef = $state()
    let lastSavedHadith = -1 // Track to avoid infinite loops
    let isRestored = false // Prevent saving until after restoration

    /**
     * @param {number} hadithNumber
     * @param {string} chapter
     */
    function saveToSlot(hadithNumber, chapter) {
        if (!browser) return
        if (!isRestored) return // Don't save until position is restored

        // Avoid saving the same hadith again (prevents infinite loop)
        if (lastSavedHadith === hadithNumber) return
        lastSavedHadith = hadithNumber

        const newSlot = {
            hadithNumber,
            chapter,
            timestamp: Date.now(),
        }

        // Update active slot
        if (readingSlots.length === 0) {
            readingSlots = [newSlot]
            activeSlotIndex = 0
        } else {
            readingSlots[activeSlotIndex] = newSlot
            readingSlots = [...readingSlots] // trigger reactivity
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                slots: readingSlots,
                activeSlot: activeSlotIndex,
            }),
        )
    }

    /**
     * Create a new reading slot when user searches and jumps to a new area
     * @param {number} hadithNumber
     * @param {string} chapter
     */
    function createNewSlot(hadithNumber, chapter) {
        if (!browser) return
        if (!isRestored) return // Don't create until position is restored

        // Check if this hadith already exists in a slot
        const existingIndex = readingSlots.findIndex(
            (s) => s.hadithNumber === hadithNumber,
        )
        if (existingIndex !== -1) {
            activeSlotIndex = existingIndex
            lastSavedHadith = hadithNumber
            return
        }

        const newSlot = {
            hadithNumber,
            chapter,
            timestamp: Date.now(),
        }

        if (readingSlots.length < MAX_SLOTS) {
            // Add new slot
            readingSlots = [...readingSlots, newSlot]
            activeSlotIndex = readingSlots.length - 1
        } else {
            // Replace oldest slot (by timestamp)
            let oldestIndex = 0
            let oldestTime = readingSlots[0].timestamp
            readingSlots.forEach((slot, i) => {
                if (slot.timestamp < oldestTime) {
                    oldestTime = slot.timestamp
                    oldestIndex = i
                }
            })
            readingSlots[oldestIndex] = newSlot
            readingSlots = [...readingSlots]
            activeSlotIndex = oldestIndex
        }

        lastSavedHadith = hadithNumber

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                slots: readingSlots,
                activeSlot: activeSlotIndex,
            }),
        )
    }

    /**
     * Navigate to a specific slot
     * @param {number} slotIndex
     */
    function goToSlot(slotIndex) {
        const slot = readingSlots[slotIndex]
        if (!slot) return

        activeSlotIndex = slotIndex
        lastSavedHadith = slot.hadithNumber // Prevent immediate re-save
        const hadithIndex = allHadiths.findIndex(
            (h) => h.number === slot.hadithNumber,
        )
        if (hadithIndex !== -1) {
            searchQuery = '' // Clear search
            currentIndex = hadithIndex
        }
        showBookmarkMenu = false

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                slots: readingSlots,
                activeSlot: activeSlotIndex,
            }),
        )
    }

    // Save position whenever it changes (only when not searching)
    $effect(() => {
        if (browser && searchQuery.trim() === '' && currentHadith) {
            saveToSlot(currentHadith.number, currentHadith.chapterTitle)
        }
    })

    // Detect when user searches and jumps to a new position
    $effect(() => {
        if (browser && currentHadith) {
            const wasSearching = previousSearchQuery.trim() !== ''
            const isSearching = searchQuery.trim() !== ''

            // User just cleared search after searching - check if we need a new slot
            if (wasSearching && !isSearching && readingSlots.length > 0) {
                const currentSlot = readingSlots[activeSlotIndex]
                if (currentSlot) {
                    // If jumped more than 50 hadiths away, create new slot
                    const distance = Math.abs(
                        currentHadith.number - currentSlot.hadithNumber,
                    )
                    if (distance > 50) {
                        createNewSlot(
                            currentHadith.number,
                            currentHadith.chapterTitle,
                        )
                    }
                }
            }

            previousSearchQuery = searchQuery
        }
    })

    // Restore position on mount
    onMount(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                const { slots, activeSlot } = JSON.parse(saved)
                if (slots && slots.length > 0) {
                    readingSlots = slots
                    activeSlotIndex = activeSlot ?? 0

                    // Navigate to active slot
                    const activeSlotData = slots[activeSlotIndex]
                    if (activeSlotData) {
                        const savedIndex = allHadiths.findIndex(
                            (h) => h.number === activeSlotData.hadithNumber,
                        )
                        if (savedIndex !== -1) {
                            currentIndex = savedIndex
                            lastSavedHadith = activeSlotData.hadithNumber
                        }
                    }
                }
            }
        } catch (e) {
            // Ignore localStorage errors
        }
        isRestored = true // Allow saving now
    })

    function nextHadith() {
        if (currentIndex < filteredHadiths.length - 1) {
            currentIndex++
        }
    }

    function prevHadith() {
        if (currentIndex > 0) {
            currentIndex--
        }
    }

    /** @param {number} chapterId */
    function jumpToChapter(chapterId) {
        const chapter = riyadusSalihin.find((c) => c.id === chapterId)
        if (!chapter || chapter.hadiths.length === 0) return
        const firstNumber = chapter.hadiths[0].number
        const idx = allHadiths.findIndex((h) => h.number === firstNumber)
        if (idx === -1) return
        searchQuery = ''
        currentIndex = idx
    }

    // Close bookmark menu on outside click
    $effect(() => {
        if (!showBookmarkMenu) return
        /** @param {MouseEvent} e */
        function onDocClick(e) {
            if (
                bookmarkRef &&
                e.target instanceof Node &&
                !bookmarkRef.contains(e.target)
            ) {
                showBookmarkMenu = false
            }
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    })

    // Navigation via keys
    /**
     * @param {KeyboardEvent} e
     */
    function handleKeydown(e) {
        if (e.key === 'Escape' && showBookmarkMenu) {
            showBookmarkMenu = false
            return
        }
        if (e.key === 'ArrowRight') nextHadith()
        if (e.key === 'ArrowLeft') prevHadith()
    }
</script>

<svelte:head>
    <title>Home - Riyad-us-Salihin</title>
</svelte:head>
<svelte:window onkeydown={handleKeydown} />

<div
    role="main"
    class="max-w-2xl mx-auto px-4 py-6 md:py-12 min-h-screen flex flex-col items-center gap-2 md:gap-4"
>
    <!-- Header & Search -->
    <header class="w-full text-center mb-1">
        <h1
            class="text-2xl md:text-4xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent flex items-center justify-center gap-2 md:gap-3"
        >
            <span>Riyad-us-Salihin</span>
            <span class="text-primary/10 text-xl font-light">|</span>
            <span class="arabic text-2xl md:text-3xl text-primary/80"
                >رياض الصالحين</span
            >
        </h1>

        <!-- Search Row with Bookmark -->
        <div
            class="flex items-center gap-2 w-full max-w-2xl mx-auto mb-2 md:mb-6"
        >
            <!-- Contents Drawer Trigger (leading) -->
            <button
                onclick={() => (chaptersOpen = true)}
                class="p-3 md:p-4 bg-bg-card border border-white/10 rounded-full text-primary/60 hover:text-primary hover:border-primary/30 transition-all cursor-pointer shrink-0"
                title="Table of contents"
                aria-label="Open table of contents"
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
                        d="M4 6h16M4 12h16M4 18h10"
                    ></path>
                </svg>
            </button>

            <!-- Search Input -->
            <div class="relative flex-1">
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search hadith..."
                    class="w-full bg-bg-card border border-white/10 rounded-full py-3 md:py-4 px-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm md:text-base placeholder:text-text-dim/50"
                    oninput={() => (currentIndex = 0)}
                />
                <svg
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim/50"
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

            <!-- Reading Progress Bookmark Button -->
            <div bind:this={bookmarkRef} class="relative">
                <button
                    onclick={() => (showBookmarkMenu = !showBookmarkMenu)}
                    class="p-3 md:p-4 bg-bg-card border border-white/10 rounded-full text-primary/60 hover:text-primary hover:border-primary/30 transition-all relative cursor-pointer"
                    title="Reading progress"
                >
                    <svg
                        class="w-5 h-5 md:w-6 md:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                    </svg>
                    {#if readingSlots.length > 0}
                        <span
                            class="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-primary text-bg-dark text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center"
                        >
                            {readingSlots.length}
                        </span>
                    {/if}
                </button>

                <!-- Dropdown Menu -->
                {#if showBookmarkMenu}
                    <div
                        class="absolute right-0 top-full mt-2 w-64 md:w-72 bg-bg-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                        in:fly={{ y: -10, duration: 200 }}
                    >
                        <div class="p-3 border-b border-white/10">
                            <p
                                class="text-xs text-text-dim uppercase tracking-wider font-bold"
                            >
                                Reading Progress
                            </p>
                        </div>

                        {#if readingSlots.length === 0}
                            <div
                                class="p-4 text-center text-text-dim/50 text-sm"
                            >
                                No saved positions yet.<br />Start reading to
                                auto-save.
                            </div>
                        {:else}
                            <div class="max-h-48 overflow-y-auto">
                                {#each readingSlots as slot, i}
                                    <button
                                        onclick={() => goToSlot(i)}
                                        class="cursor-pointer w-full p-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 {i ===
                                        activeSlotIndex
                                            ? 'bg-primary/10'
                                            : ''}"
                                    >
                                        <div class="flex items-center gap-3">
                                            <span
                                                class="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0"
                                            >
                                                {i + 1}
                                            </span>
                                            <div class="flex-1 min-w-0">
                                                <p
                                                    class="text-sm font-medium text-text-main truncate"
                                                >
                                                    Hadith #{slot.hadithNumber}
                                                </p>
                                                <p
                                                    class="text-xs text-text-dim truncate"
                                                >
                                                    {slot.chapter}
                                                </p>
                                            </div>
                                            {#if i === activeSlotIndex}
                                                <span
                                                    class="text-[8px] text-primary uppercase font-bold"
                                                    >Active</span
                                                >
                                            {/if}
                                        </div>
                                    </button>
                                {/each}
                            </div>
                        {/if}

                        <!-- New Slot Button -->
                        {#if currentHadith}
                            <div class="p-2 border-t border-white/10">
                                <button
                                    onclick={() => {
                                        createNewSlot(
                                            currentHadith.number,
                                            currentHadith.chapterTitle,
                                        )
                                        showBookmarkMenu = false
                                    }}
                                    class="cursor-pointer w-full py-2 px-3 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg
                                        class="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 4v16m8-8H4"
                                        ></path>
                                    </svg>
                                    {readingSlots.length < MAX_SLOTS
                                        ? 'Start new reading slot'
                                        : 'Replace oldest slot'}
                                </button>
                            </div>
                        {/if}

                        <div class="p-2 border-t border-white/10 bg-white/2">
                            <p class="text-[10px] text-text-dim/50 text-center">
                                {readingSlots.length}/{MAX_SLOTS} slots used. Active
                                slot auto-updates as you read.
                            </p>
                        </div>
                    </div>
                {/if}
            </div>

            <!-- About Link -->
            <a
                href="/about"
                class="p-3 md:p-4 bg-bg-card border border-white/10 rounded-full text-primary/60 hover:text-primary hover:border-primary/30 transition-all"
                title="About this collection"
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            </a>

            <!-- Install App -->
            <InstallPrompt />
        </div>
    </header>

    {#if currentHadith}
        <div class="w-full grow relative mb-24">
            {#key currentHadith.number}
                <div
                    in:fly={{ y: 20, duration: 400, opacity: 0 }}
                    class="glass-card p-6 md:p-10 shadow-2xl space-y-8"
                >
                    <!-- Metadata: Chapter Info Only -->
                    <div class="space-y-4 border-l-2 border-primary pl-4">
                        <div class="space-y-1">
                            <span
                                class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-hadith font-bold"
                            >
                                {currentHadith.chapterTitle}
                            </span>
                            {#if currentHadith.arabicChapterTitle}
                                <p
                                    class="arabic text-sm md:text-lg text-primary/60 text-left line-clamp-1"
                                >
                                    {currentHadith.arabicChapterTitle}
                                </p>
                            {/if}
                        </div>
                    </div>

                    <!-- Intro Verses (Shown at the start of each chapter) -->
                    {#if currentHadith.isFirstInChapter && currentHadith.introVerses && currentHadith.introVerses.length > 0}
                        <div
                            class="space-y-6 bg-white/3 p-5 md:p-8 rounded-2xl border border-white/5"
                        >
                            {#each currentHadith.introVerses as verse}
                                <div class="space-y-3">
                                    <p
                                        class="arabic text-xl md:text-2xl leading-relaxed text-right text-quran opacity-90"
                                    >
                                        {verse.arabicText}
                                    </p>
                                    <p
                                        class="text-[10px] md:text-xs text-text-dim text-right"
                                    >
                                        — {verse.reference}
                                    </p>
                                    <p
                                        class="text-text-dim italic text-sm md:text-base leading-relaxed font-light"
                                    >
                                        {verse.englishText}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    {/if}

                    <!-- Hadith Content -->
                    <div class="flex flex-col gap-4 md:gap-6">
                        <h2
                            class="text-lg md:text-2xl font-semibold border-b border-white/5 pb-1"
                        >
                            Hadith #{currentHadith.number}
                        </h2>

                        <div class="text-right -mt-3">
                            <p
                                class="arabic text-xl md:text-2xl leading-normal text-hadith"
                            >
                                {currentHadith.arabicText}
                            </p>
                        </div>

                        <div class="space-y-4">
                            <p
                                class="text-[10px] md:text-xs text-primary tracking-[0.2em] font-bold uppercase"
                            >
                                {currentHadith.narrator}
                            </p>
                            <p
                                class="text-sm md:text-base leading-relaxed text-text-main font-light italic opacity-80"
                            >
                                {currentHadith.englishText}
                            </p>
                        </div>

                        {#if currentHadith.commentary}
                            <div
                                class="bg-primary/5 p-4 md:p-6 rounded-xl border border-primary/10"
                            >
                                <p
                                    class="text-[10px] text-primary mb-2 uppercase font-mono font-bold"
                                >
                                    Commentary
                                </p>
                                <div
                                    class="text-sm md:text-base text-text-main/80 leading-relaxed font-light"
                                >
                                    {@html currentHadith.commentary}
                                </div>
                            </div>
                        {/if}

                        <div
                            class="flex items-center gap-3 text-[10px] md:text-xs text-text-dim/40 font-mono pt-4 border-t border-white/5"
                        >
                            <span>{currentHadith.collection}</span>
                            {#if currentHadith.grade && currentHadith.grade !== currentHadith.collection && !currentHadith.grade.includes(currentHadith.collection)}
                                <span class="w-1 h-1 rounded-full bg-current"
                                ></span>
                                <span class="text-primary/70"
                                    >{currentHadith.grade}</span
                                >
                            {:else if currentHadith.grade && (currentHadith.grade.includes('Sahih') || currentHadith.grade.includes('Hasan'))}
                                <span class="w-1 h-1 rounded-full bg-current"
                                ></span>
                                <span class="text-primary/70"
                                    >{currentHadith.grade.split(' ')[0]}</span
                                >
                            {/if}
                        </div>
                    </div>
                </div>
            {/key}
        </div>

        <!-- Navigation -->
        <nav
            aria-label="Hadith navigation"
            class="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-12 bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/10 px-6 py-3 md:px-10 md:py-5 rounded-full shadow-2xl z-50"
        >
            <button
                onclick={prevHadith}
                disabled={currentIndex === 0}
                aria-label="Previous hadith"
                class="text-text-dim hover:text-primary disabled:opacity-10 transition-colors p-1 cursor-pointer"
            >
                <svg
                    class="w-6 h-6 md:w-8 md:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
            </button>

            <div class="flex flex-col items-center min-w-[80px]">
                <div class="flex items-baseline gap-1">
                    <span class="text-primary font-bold text-lg md:text-2xl"
                        >{currentIndex + 1}</span
                    >
                    <span class="text-text-dim/30 text-xs md:text-sm"
                        >/ {filteredHadiths.length}</span
                    >
                </div>
                <span
                    class="text-[8px] uppercase tracking-widest text-text-dim/40 mt-0.5"
                    >HADITH</span
                >
            </div>

            <button
                onclick={nextHadith}
                disabled={currentIndex >= filteredHadiths.length - 1}
                aria-label="Next hadith"
                class="text-text-dim hover:text-primary disabled:opacity-10 transition-colors p-1 cursor-pointer"
            >
                <svg
                    class="w-6 h-6 md:w-8 md:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    ></path>
                </svg>
            </button>
        </nav>
    {:else}
        <div class="mt-40 text-center space-y-6">
            <p class="text-xl text-text-dim/40 italic">
                "No matches found for your search"
            </p>
            <button
                onclick={() => (searchQuery = '')}
                aria-label="Clear filter"
                class="bg-primary/10 text-primary px-6 py-2 rounded-full text-sm border border-primary/20 hover:bg-primary/20 transition-all font-medium"
            >
                Clear filter
            </button>
        </div>
    {/if}
</div>

<ChaptersDrawer
    bind:open={chaptersOpen}
    chapters={chapterEntries}
    currentChapterId={currentHadith?.chapterId ?? 0}
    onSelect={jumpToChapter}
/>

<style>
    :global(body) {
        background: radial-gradient(circle at 50% 0%, #202020 0%, #121212 100%);
    }
</style>
