<script>
    import { ShieldCheck } from "@lucide/svelte";
    import gsap from 'gsap'


    let {children} = $props()



    let cardElement
    let logoElement


    $effect(() => {
        gsap.fromTo(cardElement,
            {opacity: 0, y:30},
            {opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.2})
        gsap.from(logoElement, {
                scale: 0.5,
                rotation: -45,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)",
                delay: 0.4
            })
    })

    
</script>
<div
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xl"
>
	<div bind:this={cardElement}
		class="glass-card relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 p-10 shadow-2xl"
	>
		<div class="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-600/10 blur-[80px]">
        </div>
        <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full"></div>
        <div class="flex flex-col items-center mb-10 relative z-10">
            <div bind:this={logoElement} class="p-5 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-xl shadow-blue-600/20">
                <ShieldCheck size={48}/>
            </div>

            <h1 class="text-3xl font-black tracking-tight text-white italic">Secure<span class="text-blue-500">Insure</span></h1>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-3"> SSO control access</p>
        </div>
        {@render children()}
	</div>
</div>





<style>
	:global(body) {
		background-color: #070b14;
		margin: 0;
		overflow: hidden;
	}

    .glass-card {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
</style>

