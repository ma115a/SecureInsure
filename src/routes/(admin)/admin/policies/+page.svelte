<script>
    import HomeContainer from "$lib/components/homeContainer.svelte";

    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import { 
        ShieldAlert, 
        Users, 
        FilePlus, 
        Activity, 
        ShieldCheck, 
        UserPlus, 
        Search,
        TrendingUp
    } from '@lucide/svelte';


    export let data
</script>



<HomeContainer title="Policies" subtitle="See the current policies in the system and add new ones">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Forma za novu polisu -->
        <div class="admin-stagger p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
            <h4 class="text-lg font-bold mb-6 flex items-center gap-2"><FilePlus size={18} /> New Offer</h4>
            <form method="POST" use:enhance class="space-y-4">
                <div class="space-y-1">
                    <label class="text-[9px] font-bold text-slate-500 uppercase ml-1" for="name">Policy name</label>
                    <input name="name" type="text" placeholder="ex. Life insurance" class="w-full p-4 text-white rounded-2xl bg-white/5 border border-white/5 text-sm" required />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-slate-500 uppercase ml-1" for="price">Premium (€)</label>
                        <input name="price" type="number" step="0.01" placeholder="ex. 1000.00" class="w-full p-4 text-white rounded-2xl bg-white/5 border border-white/5 text-sm" required />
                    </div>
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-slate-500 uppercase ml-1" for="coverage">Coverage (€)</label>
                        <input name="coverage" type="number" placeholder="ex. 100000.00" class="w-full p-4 text-white rounded-2xl bg-white/5 border border-white/5 text-sm" required />
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-slate-500 uppercase ml-1" for="policyType">Policy Type</label>
                        <select name="policyType" id="policyType" class="w-full p-4 text-white rounded-2xl bg-white/5 border border-white/5 text-sm" required>
                            <option value="MONTHLY">MONTHLY</option>
                            <option value="YEARLY">YEARLY</option>
                        </select>
                    </div>
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-slate-500 uppercase ml-1" for="validityDays">Validity Days</label>
                        <input name="validityDays" type="number" placeholder="ex. 30" class="w-full p-4 text-white rounded-2xl bg-white/5 border border-white/5 text-sm" required />
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-[9px] font-bold text-slate-500 uppercase ml-1" for="description">Description</label>
                    <textarea name="description" rows="3" class="w-full p-4 text-white rounded-2xl bg-white/5 border border-white/5 text-sm resize-none"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white font-black py-4 rounded-2xl text-xs mt-4 hover:bg-blue-500 transition-all">Add to offers</button>
            </form>
        </div>

        <!-- Aktivne ponude u bazi -->
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

            {#each data.policies as policy}
                <div class="admin-stagger p-6 rounded-[2rem] bg-white/[0.04] border border-blue-500/20 relative overflow-hidden">
                    <div class="relative z-10">
                        <h5 class="font-black text-white text-xl">{policy.name}</h5>
                        <p class="text-[10px] text-blue-400 font-bold uppercase mt-1">{policy.description}</p>
                        <div class="mt-8 flex items-end justify-between">
                            <div>
                                <p class="text-[9px]  text-white font-bold uppercase">Price</p>
                                <p class="text-2xl font-black text-white">{policy.base_price}€</p>
                            </div>
                            <!-- <button class="text-xs font-bold text-slate-500 hover:text-white underline">Uredi</button> -->
                        </div>
                    </div>
                    <TrendingUp class="absolute -right-4 -bottom-4 w-24 h-24 text-blue-500/5" />
                </div>
            {/each}
        </div>
    </div>
</HomeContainer>
