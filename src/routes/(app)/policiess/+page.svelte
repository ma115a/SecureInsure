<script>
    import HomeContainer from "$lib/components/homeContainer.svelte";
	import PaymentModal from "$lib/components/PaymentModal.svelte";
    import { CheckCircle2, Shield } from "@lucide/svelte";

    let { data } = $props()

    let selectedPolicy = $state(null)
    let isModalOpen = $state(false)
    let showSuccessToast = $state(false)
    let lastPolicyNumber = $state('')
    function openPayment(policy) {
        selectedPolicy = policy
        isModalOpen = true
    }


    function handlePaymentComplete(policyNumber) {
        showSuccessToast = true
        lastPolicyNumber = policyNumber
        setTimeout(() => showSuccessToast = false, 5000)
    }
</script>


<HomeContainer  title="Buy a policy" subtitle="Offers available for you">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.policies as policy}
        <div class="stagger-item p-8 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-[20px] border border-white/5 flex flex-col group relative overflow-hidden transition-all hover:bg-white/5 hover:-translate-y-1">
             <div class="flex justify-between items-start mb-4">
                 <div>
                    <h4 class="text-xl font-black text-white capitalize">{policy.name}</h4>
                 </div>
                 <div class="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <Shield size={20} />
                 </div>
            </div>
            
            <p class="text-xs text-slate-500 mb-8 grow leading-relaxed">{policy.description}</p>
            
            <div class="mb-4">
                 <p class="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-1">Coverage</p>
                 <span class="text-white font-bold">{policy.base_coverage} USD</span>
            </div>

            <div class="flex justify-between items-end relative z-10">
                <div>
                     <p class="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-1">Price</p>
                    <span class="text-2xl font-black text-blue-400">{policy.base_price} USD</span>
                </div>
                <button onclick={() => openPayment(policy)} class="px-5 cursor-pointer text-white py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    Buy
                </button>
            </div>
            
             <!-- Dekorativni sjaj u pozadini -->
             <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full pointer-events-none"></div>
        </div>
    {/each}
    </div>
</HomeContainer>



{#if selectedPolicy}
    <PaymentModal policy={selectedPolicy} bind:isOpen={isModalOpen} onComplete={handlePaymentComplete}/>
{/if}

{#if showSuccessToast}
    <div class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 transition-all animate-bounce">
        <CheckCircle2 size={24} />
        <div>
            <p class="font-black text-sm uppercase">Payment sucessfull</p>
            <p class="text-[10px] font-bold opacity-80 uppercase tracking-widest">PolicyNumber: {lastPolicyNumber}</p>
        </div>
    </div>
{/if}
