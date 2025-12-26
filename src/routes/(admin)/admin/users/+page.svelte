<script>
    import HomeContainer from "$lib/components/homeContainer.svelte";
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";

    export let form
    let loading = false
    export let data
    console.log(data.users)

    import { 
        ShieldAlert, 
        Users, 
        FilePlus, 
        Activity, 
        ShieldCheck, 
        UserPlus, 
        Search,
        TrendingUp,
        User,
        Lock,
        ChevronRight
    } from '@lucide/svelte';



    function resetForm(event) {
        event.target.reset(); // Resets all form fields
    }
</script>


<HomeContainer title="Users" subtitle="See all users registered on the system and add new admins to the system">

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Lista korisnika -->
                <div class="lg:col-span-2 space-y-4">
                    
                    <div class="admin-stagger overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2">
                        <table class="w-full text-left">
                            <thead class="bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <tr>
                                    <th class="p-6">Name and Lastname</th>
                                    <th class="p-6">Username</th>
                                    <th class="p-6">Role</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                {#each data.users as user}
                                    <tr class="border-t border-white/5 hover:bg-white/5 transition-colors">
                                        <td class="p-6 font-bold text-white">{user.name} {user.lastname}</td>
                                        <td class="p-6 font-bold text-white">{user.username}</td>
                                        <td class="p-6"><span class="px-2 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-black rounded">{user.admin === 1 ? 'ADMIN' : 'REGULAR'}</span></td>
                                        <!-- <td class="p-6"><span class="flex items-center gap-2 text-[10px] font-bold text-emerald-500"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> AKTIVAN</span></td> -->
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Forma za novog Admina -->
                <div class="admin-stagger space-y-6">
                    <div class="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10">
                        <h4 class="text-lg font-bold mb-6 flex items-center gap-2"><UserPlus size={18} /> Kreiraj Admina</h4>
        <form method="POST" use:enhance={() => {{
            loading = true
            return async({update, result, form: FormData}) => {
                loading =  false
                await update()
                if (result.type === 'success' && result.data?.success) {
                        resetForm(new Event('submit', { bubbles: true, cancelable: true, composed: true })); // Reset the form
                        await invalidateAll(); // Invalidate all data to refetch the users list
                    }
            }
        }}} class="space-y-5">

            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="name">Name</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><User/></span>
                    <input type="text" name="name" id="name" required placeholder="Name" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>
            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="lastname">Lastname</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><Lock/></span>
                    <input type="text" name="lastname" id="lastname" required placeholder="Lastname" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>

            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="email">Email</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><Lock/></span>
                    <input type="email" name="email" id="email" required placeholder="Email" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>
            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="username">Username</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><User/></span>
                    <input type="text" name="username" id="username" required placeholder="Username" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>
            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="password">Password</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><User/></span>
                    <input type="password" name="password" id="password" required placeholder="Password" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>
            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="confirmPassword">Repeat password</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><User/></span>
                    <input type="password" name="confirmPassword" id="confirmPassword" required placeholder="Password" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>
            {#if form?.message}
                <p class="text-xs font-bold text-white text-center bg-white/5 py-3 rounded-xl">{form.message}</p>
            {/if}


            <button type="submit" disabled={loading} class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer">{loading ? "Processing" : "Register"} <ChevronRight class="group-hover:translate-x-1 transition-transform"/></button>
        </form>
                    </div>
                </div>
            </div>
</HomeContainer>
