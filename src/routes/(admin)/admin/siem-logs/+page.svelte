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



    const logs = [
        { id: 1, type: 'CRITICAL_INJECTION_ATTEMPT', user: 'anonymous', ip: '192.168.1.44', time: 'Prije 2 min' },
        { id: 2, type: 'AUTH_FAILURE', user: 'marko99', ip: '82.10.11.4', time: 'Prije 15 min' },
        { id: 3, type: 'ADMIN_ACCESS', user: 'admin_jovan', ip: '10.0.0.5', time: 'Prije 1h' }
    ];
</script>
<HomeContainer title="SIEM Logs" subtitle="uga buga">
    <div class="grid grid-cols-1 gap-4">
        <div class="admin-stagger flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold italic flex items-center gap-2">
                <ShieldAlert class="text-red-500" /> Sigurnosne Anomalije
            </h3>
            <div class="text-[10px] font-bold text-slate-500 uppercase">Automatsko osvježavanje aktivno</div>
        </div>

        {#each logs as log}
            <div class="admin-stagger p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                <div class="flex items-center gap-6">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center {log.type.includes('CRITICAL') ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h4 class="font-bold text-sm uppercase tracking-tight">{log.type.replace(/_/g, ' ')}</h4>
                        <p class="text-[10px] text-slate-500 font-bold mt-1 uppercase">Korisnik: <span class="text-slate-300">{log.user}</span> • IP: <span class="text-slate-300">{log.ip}</span></p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-[10px] font-black text-slate-600 uppercase mb-1">{log.time}</p>
                    <button class="text-blue-500 text-[10px] font-black uppercase tracking-widest hover:underline">Detalji</button>
                </div>
            </div>
        {/each}
    </div>

</HomeContainer>
