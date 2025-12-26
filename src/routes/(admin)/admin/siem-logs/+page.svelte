<script>

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

    import HomeContainer from '$lib/components/homeContainer.svelte';

    let {data} = $props()

</script>
<HomeContainer title="SIEM Logs" subtitle="Security logs of the system">
    <div class="grid grid-cols-1 gap-4">
        <div class="admin-stagger flex items-center justify-between mb-4">
            <h3 class="text-white font-bold italic flex items-center gap-2">
                <ShieldAlert class="text-red-500" /> Security Details
            </h3>
        </div>

        {#each data.logs as log}
            <div class="admin-stagger p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                <div class="flex items-center gap-6">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center {log.type.includes('CRITICAL') ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h4 class="font-bold text-white text-sm uppercase tracking-tight">{log.type.replace(/_/g, ' ')}</h4>
                        <p class="text-[10px] text-slate-500 font-bold mt-1 uppercase">Korisnik: <span class="text-slate-300">{log.user}</span> • IP: <span class="text-slate-300">{log.ip}</span></p>
                        <p class="text-white text-xs">{log.details}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-[10px] font-black text-slate-600 uppercase mb-1">{log.timestamp}</p>
                </div>
            </div>
        {/each}
    </div>

</HomeContainer>
