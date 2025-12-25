<script>
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { User, Lock, ChevronRight} from '@lucide/svelte';
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";

    let tempUsername = $page.data.tempUsername
    console.log($page)

    let otp = ['','','','','','']


    function handleOtpInput(e, index) {
        const value = e.target.value
        if(value && index < 5) {
            const next = e.target.nextElementSibling
            if(next) next.focus()
        }
    }

    function handleOtpKeyDown(e, index) {
        if(e.key === 'Backspace' && !otp[index] && index > 0) {
            const prev = e.target.previousElementSibling
            if(prev) prev.focus()
        }
    }



    
</script>



<GlassCard>
    <div class="space-y-8 text-center relative z-10">
        <form method="POST" use:enhance class="space-y-5">
            <input type="hidden" name="username" value={tempUsername}>
            <input type="hidden" name="code" value={otp.join('')}>
            <div class="space-y-2">
                <h3 class="text-xl font-bold text-white">Verification</h3>
                <p class="text-slate text-s text-white"> Please enter the 6-digit code sent to your email address</p>
            </div>

            <div class="flex justify-between gap-2">
                {#each otp as digit, i}
                    <input type="text" maxlength="1" bind:value={otp[i]} on:input={(e) => handleOtpInput(e, i)} on:keydown={(e) => handleOtpKeyDown(e, i)} class="w-full h-14 text-center text-xl rounded-xl font-black bg-white/5 border border-white/5 text-white focus:border-blue-500/50 focus-bg-white/10 outline-none transition-all">
                {/each} 
            </div>

            <div class="space-y-4">
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer">Verify</button>
            </div>

        </form>
    </div>
</GlassCard>
