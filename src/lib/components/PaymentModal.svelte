<script>


    import {X, ShieldCheck} from '@lucide/svelte'
    import PayPalButton from './PayPalButton.svelte';
    import GlassCard from './GlassCard.svelte';
    import gsap from 'gsap';
    let {policy, isOpen = $bindable(), onComplete} = $props()

    let modalRef = $state()
    let backdropRef = $state()


    $effect(() => {
        if (isOpen) {
            gsap.to(backdropRef, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef, 
                { scale: 0.9, opacity: 0, y: 20 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    });

    function close() {
        gsap.to(modalRef, { scale: 0.9, opacity: 0, y: 20, duration: 0.3, onComplete: () => isOpen = false });
        gsap.to(backdropRef, { opacity: 0, duration: 0.3 });
    }

    function handleSuccess(policyNumber) {
        onComplete(policyNumber);
        close();
    }

</script>



{#if isOpen}
    <div bind:this={backdropRef} class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070b14]/80 backdrop-blur-md">
        <GlassCard bind:this={modalRef}>
            <button onclick={close} class="absolute top-6 right-6 text-slate-500 transition-colors cursor-pointer hover:text-white"><X size={28} /></button>

            <div class="mb-8">
                <div class="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 mb-4"> <ShieldCheck/></div>
<h2 class="text-2xl font-black italic text-white">Transaction <span class="text-blue-500">Confirmation</span></h2>
                <p class="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Policy: {policy.name}</p>
            </div>
<div class="bg-white/5 p-6 rounded-2xl mb-8 border border-white/5">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-500 uppercase">Total amount</span>
                    <span class="text-2xl font-black text-white">{policy.base_price} USD</span>
                </div>
<div class="space-y-4">
                <PayPalButton 
                    policy={policy} 
                    onPaymentSuccess={handleSuccess} 
                />
            </div>
            </div>
        </GlassCard>
        
    </div>
{/if}



