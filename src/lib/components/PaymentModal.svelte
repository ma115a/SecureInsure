<script>


    import {X, ShieldCheck} from '@lucide/svelte'
    import PayPalButton from './PayPalButton.svelte';
    import GlassCard from './GlassCard.svelte';
    let {policy, isOpen = $bindable(), onComplete} = $props()

    let modalRef = $state()
    let backdropRef = $state()

</script>



{#if isOpen}
    <div bind:this={backdropRef} class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070b14]/80 backdrop-blur-md">
        <GlassCard bind:this={modalRef}>
            <button class="absolute top-6 right-6 text-slate-500 transition-colors cursor-pointer hover:text-white"><X size={28} /></button>

            <div class="mb-8">
                <div class="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 mb-4"> <ShieldCheck/></div>
<h2 class="text-2xl font-black italic text-white">Transaction <span class="text-blue-500">Confirmation</span></h2>
                <p class="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Policy: {policy.name}</p>
            </div>
<div class="bg-white/5 p-6 rounded-2xl mb-8 border border-white/5">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-500 uppercase">Total amount</span>
                    <span class="text-2xl font-black text-white">{policy.base_price}</span>
                </div>
<div class="space-y-4">
                <PayPalButton 
                    policy={policy} 
                    onPaymentSuccess={() => {}} 
                />
            </div>
            </div>
        </GlassCard>
        
    </div>
{/if}



