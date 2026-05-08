<script>
    import { fly } from 'svelte/transition'
</script>

<svelte:head>
    <title>About - Riyad-us-Salihin</title>
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
        <span class="text-sm">Back to Hadiths</span>
    </a>

    <!-- Page Title -->
    <header class="text-center mb-4">
        <h1
            class="text-2xl md:text-4xl font-bold bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent"
        >
            About This Collection
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
                        Riyad-us-Salihin
                    </h2>
                    <p class="arabic text-primary/70">رياض الصالحين</p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                <strong class="text-primary">Riyad-us-Salihin</strong> (Gardens of
                the Righteous) is one of the most widely read and influential collections
                of hadith in the Islamic world. Compiled in the 13th century CE,
                it remains a cornerstone of Islamic literature and spiritual guidance.
            </p>

            <div class="grid grid-cols-3 gap-4 py-4">
                <div class="text-center">
                    <p class="text-2xl md:text-3xl font-bold text-primary">
                        1896
                    </p>
                    <p class="text-xs md:text-sm text-text-dim">Hadiths</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl md:text-3xl font-bold text-primary">
                        372
                    </p>
                    <p class="text-xs md:text-sm text-text-dim">Chapters</p>
                </div>
                <div class="text-center">
                    <p class="text-2xl md:text-3xl font-bold text-primary">
                        19
                    </p>
                    <p class="text-xs md:text-sm text-text-dim">Books</p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                The collection covers a comprehensive range of topics essential
                to a Muslim's daily life, including sincerity, patience,
                gratitude, remembrance of Allah, good manners, family relations,
                social conduct, and the virtues of various acts of worship. Each
                chapter begins with relevant Quranic verses, followed by
                carefully selected hadiths that illuminate the topic.
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
                        Imam An-Nawawi <span
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
                    >Nawa, Syria</span
                >
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                <strong class="text-primary"
                    >Imam Yahya ibn Sharaf an-Nawawi</strong
                > (رَحِمَهُ اللهُ) was born in the village of Nawa, near Damascus,
                Syria. He is regarded as one of the most influential scholars in
                Islamic history, particularly in the fields of hadith and Shafi'i
                jurisprudence.
            </p>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                Despite living only 45 years, Imam an-Nawawi produced an
                extraordinary body of work. His most famous contributions
                include:
            </p>

            <ul class="space-y-2 text-sm md:text-base text-text-main/80">
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        ><strong class="text-text-main">Riyad-us-Salihin</strong
                        > — This collection of hadiths for daily guidance</span
                    >
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        ><strong class="text-text-main"
                            >Al-Arba'in an-Nawawiyyah</strong
                        > — The Forty Hadiths, perhaps the most memorized hadith
                        collection</span
                    >
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        ><strong class="text-text-main"
                            >Sharh Sahih Muslim</strong
                        > — A comprehensive commentary on Sahih Muslim</span
                    >
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        ><strong class="text-text-main">Al-Majmu'</strong> — An extensive
                        work on Shafi'i jurisprudence</span
                    >
                </li>
            </ul>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                Imam an-Nawawi was known for his piety, asceticism, and devotion
                to knowledge. He never married, dedicating his entire life to
                scholarship and worship. He passed away in his hometown of Nawa
                at the age of 45, leaving behind a legacy that continues to
                benefit Muslims worldwide.
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
                        Translation & Commentary
                    </h2>
                    <p class="text-xs text-text-dim">
                        English rendering and scholarly notes
                    </p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                The English translation and commentary used in this application
                is sourced from the work published by <strong
                    class="text-primary">Muslims At Work Publications</strong
                >, a South African Islamic publishing house dedicated to making
                classical Islamic texts accessible to English-speaking
                audiences.
            </p>

            <div
                class="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3"
            >
                <p
                    class="text-xs text-primary mb-2 uppercase font-mono font-bold"
                >
                    Publication Details
                </p>
                <div class="text-sm md:text-base text-text-main/80 space-y-1">
                    <p>
                        <strong
                            >A Translation and Commentary of Riyad al-Salihin</strong
                        >
                    </p>
                    <p class="text-text-dim">3 Volumes (Hadith 1–1896)</p>
                    <p>
                        <span class="text-text-dim">General Editor:</span>
                        <strong class="text-primary"
                            >Moulana Afzal Ismail</strong
                        >
                    </p>
                    <p class="text-text-dim">
                        Muslims At Work Publications, South Africa
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
                This translation features modern, accessible English while
                maintaining fidelity to the original Arabic. The commentary
                draws from classical scholars and provides context for
                contemporary readers, explaining the practical application of
                each hadith in daily life.
            </p>
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
                        Acknowledgments
                    </h2>
                    <p class="text-xs text-text-dim">With gratitude</p>
                </div>
            </div>

            <p class="text-text-main/80 leading-relaxed text-sm md:text-base">
                We express our deepest gratitude to all those who have
                contributed to preserving and transmitting this sacred knowledge
                across generations:
            </p>

            <ul class="space-y-2 text-sm md:text-base text-text-main/80">
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        >The scholars and hadith masters who preserved these
                        prophetic traditions</span
                    >
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        >Imam an-Nawawi for his meticulous compilation and
                        selection</span
                    >
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        >Muslims At Work Publications for their excellent
                        translation and commentary</span
                    >
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        >Darussalam Publishers and Hafiz Salahuddin Yusuf for
                        their inspiring commentary that first sparked this
                        project</span
                    >
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span
                        >All who have supported the creation of this digital
                        resource</span
                    >
                </li>
            </ul>

            <div class="text-center pt-4 border-t border-white/10">
                <p class="arabic text-lg text-primary/80">جزاهم الله خيرا</p>
                <p class="text-xs text-text-dim mt-1">
                    May Allah reward them with goodness
                </p>
            </div>
        </section>

        <!-- Footer -->
        <footer class="text-center py-2 text-text-dim/50 text-xs space-y-2">
            <p>This is a free resource for the Muslim community.</p>
            <p>All praise is due to Allah, Lord of the worlds.</p>
        </footer>
    </div>
</div>

<style>
    :global(body) {
        background: radial-gradient(circle at 50% 0%, #202020 0%, #121212 100%);
    }
</style>
