<script>
    import { fly } from 'svelte/transition'
    import {
        getLanguagePreference,
        LANGUAGES,
        ui,
    } from '$lib/translations/index.js'
    import { browser } from '$app/environment'

    let lang = $state(getLanguagePreference())

    $effect(() => {
        if (browser) {
            const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr'
            document.documentElement.lang = lang
            document.documentElement.dir = dir
        }
    })
</script>

<svelte:head>
    <title>{ui('pageTitleAbout', lang)}</title>
</svelte:head>

<div
    class="max-w-2xl mx-auto px-4 py-6 md:py-12 min-h-screen"
    in:fly={{ y: 20, duration: 400, opacity: 0 }}
>
    <!-- Back Navigation -->
    <a
        href="/"
        class="inline-flex items-center gap-2 text-text-dim hover:text-primary transition-colors mb-4"
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
                d="M15 19l-7-7 7-7"
            ></path>
        </svg>
        <span class="text-sm">{ui('backToHadiths', lang)}</span>
    </a>

    <!-- Page Title -->
    <header class="text-center mb-4">
        <h1
            class="text-2xl md:text-4xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent"
        >
            {ui('aboutTitle', lang)}
        </h1>
        <p class="arabic text-xl md:text-2xl text-primary/60 mt-2">
            عن هذا الكتاب
        </p>
    </header>

    <div class="space-y-8 md:space-y-12">
        <!-- The Book -->
        <section class="glass-card p-6 md:p-8 space-y-4">
            <div class="flex items-center gap-3 border-b border-white/10 pb-3">
                <div
                    class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                >
                    <svg
                        class="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        ></path>
                    </svg>
                </div>
                <div>
                    <h2 class="text-lg md:text-xl font-semibold text-text-main">
                        {ui('aboutTheBook', lang)}
                    </h2>
                    <p class="arabic text-primary/70">رياض الصالحين</p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                <strong class="text-primary">{ui('aboutTheBook', lang)}</strong>
                {ui('aboutDesc1', lang)}
            </p>

            <div class="grid grid-cols-3 gap-4 py-4">
                <div class="text-center">
                    <p class="text-2xl md:text-3xl font-bold text-primary">
                        1896
                    </p>
                    <p class="text-xs md:text-sm text-text-dim">{ui('hadiths', lang)}</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl md:text-3xl font-bold text-primary">
                        372
                    </p>
                    <p class="text-xs md:text-sm text-text-dim">{ui('chapters_', lang)}</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl md:text-3xl font-bold text-primary">
                        19
                    </p>
                    <p class="text-xs md:text-sm text-text-dim">{ui('books', lang)}</p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                {ui('aboutDesc2', lang)}
            </p>
        </section>

        <!-- The Author -->
        <section class="glass-card p-6 md:p-8 space-y-4">
            <div class="flex items-center gap-3 border-b border-white/10 pb-3">
                <div
                    class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                >
                    <svg
                        class="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                    </svg>
                </div>
                <div>
                    <h2 class="text-lg md:text-xl font-semibold text-text-main">
                        {ui('authorTitle', lang)} <span
                            class="arabic text-base font-normal"
                            >(رَحِمَهُ اللهُ)</span
                        >
                    </h2>
                    <p class="arabic text-primary/70">الإمام النووي</p>
                </div>
            </div>

            <div class="flex flex-wrap gap-2 text-xs">
                <span
                    class="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >631 – 676 AH</span
                >
                <span
                    class="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >1233 – 1277 CE</span
                >
                <span
                    class="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >{ui('nawaLocation', lang)}</span
                >
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                {ui('aboutAuthorBio1', lang)}
            </p>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                {ui('aboutAuthorBio2', lang)}
            </p>

            <ul class="space-y-2 text-sm md:text-base text-text-main/80">
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('aboutAuthorWork1', lang)}</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('aboutAuthorWork2', lang)}</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('aboutAuthorWork3', lang)}</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('aboutAuthorWork4', lang)}</span>
                </li>
            </ul>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                {ui('aboutAuthorBio3', lang)}
            </p>
        </section>

        <!-- Translation & Commentary -->
        <section class="glass-card p-6 md:p-8 space-y-4">
            <div class="flex items-center gap-3 border-b border-white/10 pb-3">
                <div
                    class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                >
                    <svg
                        class="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        ></path>
                    </svg>
                </div>
                <div>
                    <h2 class="text-lg md:text-xl font-semibold text-text-main">
                        {ui('translationLabel', lang)}
                    </h2>
                    <p class="text-xs text-text-dim">
                        {ui('translationDesc', lang)}
                    </p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                {ui('aboutTransDesc1', lang)}
            </p>

            <div
                class="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3"
            >
                <p
                    class="text-xs text-primary mb-2 uppercase font-mono font-bold"
                >
                    {ui('pubDetails', lang)}
                </p>
                <div class="text-sm md:text-base text-text-main/80 space-y-1">
                    <p>
                        <strong>{ui('pubTitle', lang)}</strong>
                    </p>
                    <p class="text-text-dim">{ui('pubVolumes', lang)}</p>
                    <p>
                        <span class="text-text-dim">{ui('pubEditor', lang)}</span>
                        <strong class="text-primary"
                            >Moulana Afzal Ismail</strong
                        >
                    </p>
                    <p class="text-text-dim">
                        {ui('pubPublisher', lang)}
                    </p>
                    <p>
                        <a
                            href="https://www.matwork.co.za"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-primary hover:text-primary-hover transition-colors underline underline-offset-2"
                        >
                            www.matwork.co.za
                        </a>
                    </p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                {ui('aboutTransDesc2', lang)}
            </p>

            <!-- Turkish Sources — only shown in Turkish -->
            {#if lang === 'tr'}
            <div class="border-t border-white/10 pt-4 space-y-3">
                <p class="text-sm font-semibold text-text-main">
                    {ui('turkishSourcesTitle', lang)}
                </p>

                <div class="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3">
                    <p class="text-xs text-primary mb-2 uppercase font-mono font-bold">
                        Hadis Metni (1–163)
                    </p>
                    <div class="text-sm text-text-main/80 space-y-1">
                        <p><strong>Riyâzü's-Sâlihîn Metin ve Çeviri</strong></p>
                        <p class="text-text-dim">Diyanet İşleri Başkanlığı Yayınları, Ankara</p>
                    </div>
                </div>

                <div class="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3">
                    <p class="text-xs text-primary mb-2 uppercase font-mono font-bold">
                        Hadis Metni (164–1896)
                    </p>
                    <div class="text-sm text-text-main/80 space-y-1">
                        <p><strong>Riyad Us Salihin</strong></p>
                        <p class="text-text-dim">2 Cilt (Hadis 1–1896)</p>
                        <p class="text-text-dim">Darussalam Publishers</p>
                    </div>
                </div>

                <div class="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3">
                    <p class="text-xs text-primary mb-2 uppercase font-mono font-bold">
                        Şerh (Yorum)
                    </p>
                    <div class="text-sm text-text-main/80 space-y-1">
                        <p>Muslims At Work Publications İngilizce şerhinden yapay zeka destekli Türkçe çeviri</p>
                    </div>
                </div>
            </div>
            {/if}
        </section>

        <!-- Acknowledgments -->
        <section class="glass-card p-6 md:p-8 space-y-4">
            <div class="flex items-center gap-3 border-b border-white/10 pb-3">
                <div
                    class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                >
                    <svg
                        class="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                    </svg>
                </div>
                <div>
                    <h2 class="text-lg md:text-xl font-semibold text-text-main">
                        {ui('acknowledgments', lang)}
                    </h2>
                    <p class="text-xs text-text-dim">{ui('withGratitude', lang)}</p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                {ui('aboutAckIntro', lang)}
            </p>

            <ul class="space-y-2 text-sm md:text-base text-text-main/80">
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('ackBullet1', lang)}</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('ackBullet2', lang)}</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('ackBullet3', lang)}</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('ackBullet4', lang)}</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{ui('ackBullet5', lang)}</span>
                </li>
            </ul>

            <div class="text-center pt-4 border-t border-white/10">
                <p class="arabic text-lg text-primary/80">جزاهم الله خيرا</p>
                <p class="text-xs text-text-dim mt-1">
                    {ui('ackDua', lang)}
                </p>
            </div>
        </section>

        <!-- Footer -->
        <footer class="text-center py-2 text-text-dim/50 text-xs space-y-2">
            <p>{ui('freeResource', lang)}</p>
            <p>{ui('allPraise', lang)}</p>
        </footer>
    </div>
</div>

<style>
    :global(body) {
        background: radial-gradient(circle at 50% 0%, #202020 0%, #121212 100%);
    }
</style>
