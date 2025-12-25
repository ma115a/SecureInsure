<script>
    import HomeContainer from "$lib/components/homeContainer.svelte";
</script>


<HomeContainer  title="Buy a policy" subtitle="Offers available for you">
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="stagger-item p-8 rounded-[2.5rem] bg-white/2 backdrop-blur-[20px] border border-white/5 flex flex-col hover:border-blue-500/30 transition-all hover:-translate-y-1">
            <h4 class="text-lg font-bold">Kasko Plus</h4>
            <p class="text-xs text-slate-500 mt-2 mb-8 grow leading-relaxed">Osigurajte svoje vozilo od svih nepredviđenih situacija.</p>
            <div class="mt-10 flex justify-between items-center">
                <span class="text-2xl font-black text-blue-400">45€</span>
                <button class="px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    Kupi
                </button>
            </div>
        </div>
        <!-- Dodajte ostale polise po potrebi -->
    </div>
</HomeContainer>
