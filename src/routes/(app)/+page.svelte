<script>
    import gsap from 'gsap'
    import { Download, Shield  } from '@lucide/svelte';
    
    import HomeContainer from '$lib/components/homeContainer.svelte';
    import { page } from '$app/stores';

    let mainRef

    let { data } = $props()
    const totalCoverage = data.policies.reduce((sum, item) => sum + item.base_price, 0);
    console.log(totalCoverage)
</script>

<HomeContainer title="Welcome back" subtitle="Today's Insurance Review">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div class="stagger-item p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-[20px] border border-white/15">
                <p class="text-[10px] font-black uppercase text-white tracking-widest mb-4">Active policies</p>
                <h3 class="text-4xl font-black text-white tracking-tighter">{data.policies.length}</h3>
            </div>
            <div class="stagger-item p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-[20px] border border-white/15">
                <p class="text-[10px] font-black uppercase text-white tracking-widest mb-4">Total coverage</p>
                <h3 class="text-4xl font-black text-white tracking-tighter">{totalCoverage.toFixed(2)} USD</h3>
            </div>
    </div>


    <section class="space-y-6 mb-16">
        <h3 class="text-xl font-bold italic stagger-item text-white">My active policies</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#if data.policies && data.policies.length > 0}
                    {#each data.policies as policy}
                        <div class="stagger-item p-8 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-[20px] border border-white/5 group relative overflow-hidden transition-all hover:bg-white/5 hover:-translate-y-1">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="text-xl font-black text-white capitalize">{policy.name}</h4>
                                    <p class="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Policy number: {policy.policy_number}</p>
                                </div>
                                <div class="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                    <Shield size={20} />
                                </div>
                            </div>

                            <div class="mt-12 flex justify-between items-end">
                                <div>
                                    <p class="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-1">Status: {policy.status}</p>
                                    <span class="text-sm font-bold text-slate-400">Issue date: {policy.issue_date}<br></span>
                                    <span class="text-sm font-bold text-slate-400">Expiry date: {policy.expiry_date}</span>
                                </div>
                                <a href="/internal/policy/{policy.policy_number}" target="_blank" class="p-4 bg-blue-600/30 hover:bg-blue-600 hover:text-white rounded-2xl transition-all group" title="Download PDF"><Download size={20} class="group-hover:scale-110 transition-transform"/></a>
                            </div>

                            <!-- Dekorativni sjaj u pozadini -->
                            <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full pointer-events-none"></div>
                        </div>
                    {/each}
                {:else}
                    <!-- Prikaz u slučaju da nema podataka -->
                    <div class="stagger-item col-span-full p-12 rounded-[2.5rem] border border-dashed border-white/10 text-center">
                        <p class="text-slate-500 text-sm font-bold uppercase tracking-widest">You currently don't have any active policies</p>
                        <a href="/policiess" class="text-blue-500 text-[10px] font-black uppercase mt-4 inline-block hover:underline">Check out available policies</a>
                    </div>
                {/if}
        </div>
    </section>
</HomeContainer>


