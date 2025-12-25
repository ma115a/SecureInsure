<script>
    import gsap from 'gsap'
    import { Download } from '@lucide/svelte';
    import HomeContainer from '$lib/components/homeContainer.svelte';
    import { page } from '$app/stores';

    let mainRef

    const stats = [
            { label: 'Active policies', value: '3', icon: 'shield' },
            { label: 'Total coverage', value: '250,000 €', icon: 'trending-up' }
        ];
    const myPolicies = [
        { title: 'Life insurance', type: 'Premium', id:"#456", expiry: '12.2025.', color: '#ff5733' },
        { title: 'Trip insurance', type: 'Yearly',  id:"#23456",expiry: '08.2024.', color: '#3273FF' }
    ];
</script>

<HomeContainer title="Welcome back" subtitle="Today's Insurance Review">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {#each stats as stat}
            <div class="stagger-item p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-[20px] border border-white/15">
                <p class="text-[10px] font-black uppercase text-white tracking-widest mb-4">{stat.label}</p>
                <h3 class="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
            </div>
        {/each}
    </div>


    <section class="space-y-6 mb-16">
        <h3 class="text-xl font-bold italic stagger-item text-white">My active policies</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each myPolicies as p}
                        <div class="stagger-item p-8 rounded-[2.5rem] bg-white/2 backdrop-blur-[20px] border-2 group relative overflow-hidden transition-[background-color,transform] hover:bg-white/4 hover:-translate-y-1" style="border-color: {p.color}">
                            <h4 class="text-xl font-black text-white">{p.title}</h4>
                            <p class="text-s text-slate-500 mt-1 uppercase tracking-tighter">{p.type}</p>
                            <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest">ID: {p.id}</p>
                            <div class="mt-10 flex justify-between items-center">
                                <span class="text-sm font-bold text-slate-300">Valid untill {p.expiry}</span>
                                <button class="p-3 bg-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"><Download class="w-4 h-4 text-slate-400"/>
                                </button>
                            </div>
                        </div>
                    {/each}
        </div>
    </section>
</HomeContainer>


