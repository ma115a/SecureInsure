<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
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

    // Podaci iz load funkcija (locals.user, logs, users, policies)
    // let { data, form } = $props();
    
    // Lokalno stanje za navigaciju unutar admin panela
    let activeTab = $state('siem'); // 'siem', 'users', 'policies'
    let mainRef = $state();
    let loading = $state(false);

    // Mock podaci za demonstraciju (u produkciji dolaze iz data)
    const logs = [
        { id: 1, type: 'CRITICAL_INJECTION_ATTEMPT', user: 'anonymous', ip: '192.168.1.44', time: 'Prije 2 min' },
        { id: 2, type: 'AUTH_FAILURE', user: 'marko99', ip: '82.10.11.4', time: 'Prije 15 min' },
        { id: 3, type: 'ADMIN_ACCESS', user: 'admin_jovan', ip: '10.0.0.5', time: 'Prije 1h' }
    ];

    $effect(() => {
        if (!mainRef) return;
        const items = mainRef.querySelectorAll('.admin-stagger');
        gsap.fromTo(items, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        );
    });

    function setTab(tab) {
        activeTab = tab;
    }
</script>

<div class="min-h-screen bg-[#070b14] text-white pt-24 pb-12 px-8">
    <div class="max-w-7xl mx-auto" bind:this={mainRef}>
        
        <!-- Header sekcija -->
        <header class="admin-stagger flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                <div class="flex items-center gap-3 mb-2">
                    <span class="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                        Admin Terminal
                    </span>
                    <span class="text-slate-600 text-[10px] font-bold uppercase tracking-widest">v2.4.0-Stable</span>
                </div>
                <h1 class="text-4xl font-black italic tracking-tighter">System <span class="text-blue-500">Control</span></h1>
            </div>

            <!-- Tab Navigacija -->
            <div class="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                <button 
                    onclick={() => setTab('siem')} 
                    class="px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {activeTab === 'siem' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}"
                >
                    <Activity size={14} /> SIEM LOGS
                </button>
                <button 
                    onclick={() => setTab('users')} 
                    class="px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}"
                >
                    <Users size={14} /> Users
                </button>
                <button 
                    onclick={() => setTab('policies')} 
                    class="px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {activeTab === 'policies' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}"
                >
                    <FilePlus size={14} /> Policies
                </button>
            </div>
        </header>

        {#if activeTab === 'siem'}
            <!-- SIEM LOGS VIEW -->
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

        {:else if activeTab === 'users'}
            <!-- USER MANAGEMENT VIEW -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Lista korisnika -->
                <div class="lg:col-span-2 space-y-4">
                    <div class="admin-stagger bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/5">
                        <Search size={16} class="text-slate-500" />
                        <input type="text" placeholder="Pretraži bazu korisnika..." class="bg-transparent border-none outline-none text-sm w-full" />
                    </div>
                    
                    <div class="admin-stagger overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                        <table class="w-full text-left">
                            <thead class="bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <tr>
                                    <th class="p-6">Korisnik</th>
                                    <th class="p-6">Uloga</th>
                                    <th class="p-6">Status</th>
                                    <th class="p-6">Akcija</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr class="border-t border-white/5 hover:bg-white/5 transition-colors">
                                    <td class="p-6 font-bold">marko.markovic</td>
                                    <td class="p-6"><span class="px-2 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-black rounded">REGULAR</span></td>
                                    <td class="p-6"><span class="flex items-center gap-2 text-[10px] font-bold text-emerald-500"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> AKTIVAN</span></td>
                                    <td class="p-6"><button class="text-slate-500 hover:text-white transition-colors"><Activity size={16}/></button></td>
                                </tr>
                                <tr class="border-t border-white/5 hover:bg-white/5 transition-colors">
                                    <td class="p-6 font-bold">admin_jovan</td>
                                    <td class="p-6"><span class="px-2 py-1 bg-purple-500/10 text-purple-500 text-[9px] font-black rounded">ADMIN</span></td>
                                    <td class="p-6"><span class="flex items-center gap-2 text-[10px] font-bold text-emerald-500"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> AKTIVAN</span></td>
                                    <td class="p-6"><button class="text-slate-500 hover:text-white transition-colors"><Activity size={16}/></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Forma za novog Admina -->
                <div class="admin-stagger space-y-6">
                    <div class="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10">
                        <h4 class="text-lg font-bold mb-6 flex items-center gap-2"><UserPlus size={18} /> Kreiraj Admina</h4>
                        <form method="POST" action="?/createAdmin" use:enhance class="space-y-4">
                            <div class="space-y-1">
                                <label class="text-[9px] font-bold text-slate-500 uppercase ml-1">Korisničko Ime</label>
                                <input name="username" type="text" class="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-sm" required />
                            </div>
                            <div class="space-y-1">
                                <label class="text-[9px] font-bold text-slate-500 uppercase ml-1">Privremena Lozinka</label>
                                <input name="password" type="password" class="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-sm" required />
                            </div>
                            <button class="w-full bg-white text-black font-black py-4 rounded-2xl text-xs mt-4 hover:bg-blue-500 hover:text-white transition-all">OVLASTI NALOG</button>
                        </form>
                    </div>
                </div>
            </div>

        {:else if activeTab === 'policies'}
            <!-- POLICY MANAGEMENT VIEW -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Forma za novu polisu -->
                <div class="admin-stagger p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                    <h4 class="text-lg font-bold mb-6 flex items-center gap-2"><FilePlus size={18} /> Nova Ponuda</h4>
                    <form method="POST" action="?/addPolicy" use:enhance class="space-y-4">
                        <div class="space-y-1">
                            <label class="text-[9px] font-bold text-slate-500 uppercase ml-1">Naziv Paketa</label>
                            <input name="name" type="text" placeholder="npr. Kasko Plus" class="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-sm" required />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-1">
                                <label class="text-[9px] font-bold text-slate-500 uppercase ml-1">Premija (€)</label>
                                <input name="price" type="number" step="0.01" class="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-sm" required />
                            </div>
                            <div class="space-y-1">
                                <label class="text-[9px] font-bold text-slate-500 uppercase ml-1">Pokriće (€)</label>
                                <input name="coverage" type="number" class="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-sm" required />
                            </div>
                        </div>
                        <div class="space-y-1">
                            <label class="text-[9px] font-bold text-slate-500 uppercase ml-1">Opis Usluge</label>
                            <textarea name="description" rows="3" class="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-sm resize-none"></textarea>
                        </div>
                        <button class="w-full bg-blue-600 text-white font-black py-4 rounded-2xl text-xs mt-4 hover:bg-blue-500 transition-all">DODAJ U KATALOG</button>
                    </form>
                </div>

                <!-- Aktivne ponude u bazi -->
                <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="admin-stagger p-6 rounded-[2rem] bg-white/[0.04] border border-blue-500/20 relative overflow-hidden">
                        <div class="relative z-10">
                            <h5 class="font-black text-xl">Kasko Plus</h5>
                            <p class="text-[10px] text-blue-400 font-bold uppercase mt-1">ID: #001 • Aktivna</p>
                            <div class="mt-8 flex items-end justify-between">
                                <div>
                                    <p class="text-[9px] text-slate-500 font-bold uppercase">Cijena Premije</p>
                                    <p class="text-2xl font-black">45.00€</p>
                                </div>
                                <button class="text-xs font-bold text-slate-500 hover:text-white underline">Uredi</button>
                            </div>
                        </div>
                        <TrendingUp class="absolute -right-4 -bottom-4 w-24 h-24 text-blue-500/5" />
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Custom scrollbar za admin tabele */
    :global(body) {
        background-color: #070b14;
    }
    
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
</style>
