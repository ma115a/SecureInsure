<script>
    import gsap from 'gsap';
    import { tick } from 'svelte';

    let { children, title, subtitle } = $props();
    let mainRef = $state();

    $effect(async () => {
        // await tick();

        const items = mainRef.querySelectorAll('.stagger-item');
        if (items.length === 0) return;

        const tl = gsap.timeline();

        tl.to(mainRef, { 
            opacity: 1, 
            duration: 0.5, 
            ease: "power4.out" 
        })
        .from(items, {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "opacity, y"
        });
    });
</script>
<main bind:this={mainRef} class="pt-32 pb-20 px-8 max-w-7xl mx-auto relative opacity-0">
    <div class="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600/3 blur-[120px] rounded-full -z-10"></div>
    <div class="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/3 blur-[100px] rounded-full -z-10"></div>


    <div class="stagger-item mb-12">
        <h2 class="text-4xl font-black text-white tracking-tight">{title}</h2>
        <p class="text-slate-500 text-xs mt-2 italic tracking-wide uppercase font-white">{subtitle}</p>
    </div>

        {@render children()}
</main>
