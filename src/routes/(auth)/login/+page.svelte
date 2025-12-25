<script>
	import { enhance } from "$app/forms";
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { User, Lock, ChevronRight} from '@lucide/svelte';

    export let form
    let loading = false



</script>



<GlassCard>
        <div class="space-y-6 relative z-10">
            <form method="POST" use:enhance={() =>
                { 
                    loading = true
                    return async({update}) => {
                    loading = false
                    update() 
                }
            }

            }  class="space-y-5">
            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="username">Username</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><User/></span>
                    <input type="text" name="username" id="username" placeholder="Username" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>
            <div class="space-y-2">
                <label class="block text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1" for="password">Password</label>
                <div class="relative group">
                    <span class="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors"><Lock/></span>
                    <input type="password" name="password" id="password" placeholder="Password" class="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/30 focus:bg-white/10 outline-none transition-all">
                </div>
            </div>

            {#if form?.message}
                <p class="text-xs font-bold text-white text-center bg-white/5 py-3 rounded-xl">{form.message}</p>
            {/if}

            <button type="submit" disabled={loading} class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer">{loading ? "Processing" : "Login"}<ChevronRight class="group-hover:translate-x-1 transition-transform"/></button>
            </form>

        <p class="text-center text-xs text-slate-500 pt-4"> New here? <a href="/register" class="text-blue-400 hover:underline">Register now</a></p>
        </div>
</GlassCard>
