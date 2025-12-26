<script>
    import GlassCard from "$lib/components/GlassCard.svelte";
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { logSecurityEvent } from '$lib/client/siem';

    let tempUsername = $page.data.tempUsername
    console.log($page)

    let otp = $state(['','','','','',''])
    let inputRefs = [];
    let errorMessage = $state('');

    $effect(() => {
        if (inputRefs[0]) {
            inputRefs[0].focus();
        }
    });


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

    const handleFormEnhance = () => {
        return async ({ result, update }) => {
            if (result.type === 'failure' && result.data?.error) {
                errorMessage = result.data.message || 'Invalid code';
                await logSecurityEvent({
                    type: '2FA_VERIFICATION_FAILED_CLIENT',
                    details: `User ${tempUsername} failed 2FA: ${result.data.message || 'Invalid code'}`,
                    severity: 'WARNING',
                    url: '/login/2fa'
                });
            } else if (result.type === 'success') {
                errorMessage = ''; // Clear error on success
            }
            await update();
        };
    };
    
</script>



<GlassCard>
    <div class="space-y-8 text-center relative z-10">
        <form method="POST" use:enhance={handleFormEnhance} class="space-y-5">
            <input type="hidden" name="username" value={tempUsername}>
            <input type="hidden" name="code" value={otp.join('')}>
            {#if errorMessage}
                <p class="text-red-500 text-sm">{errorMessage}</p>
            {/if}
            <div class="space-y-2">
                <h3 class="text-xl font-bold text-white">Verification</h3>
                <p class="text-slate text-s text-white"> Please enter the 6-digit code sent to your email address</p>
            </div>

            <div class="flex justify-between gap-2">
                {#each otp as _, i}
                    <input type="text" maxlength="1" bind:this={inputRefs[i]} bind:value={otp[i]} on:input={(e) => handleOtpInput(e, i)} on:keydown={(e) => handleOtpKeyDown(e, i)} class="w-full h-14 text-center text-xl rounded-xl font-black bg-white/5 border border-white/5 text-white focus:border-blue-500/50 focus-bg-white/10 outline-none transition-all">
                {/each} 
            </div>

            <div class="space-y-4">
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer">Verify</button>
            </div>

        </form>
    </div>
</GlassCard>
