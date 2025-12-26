<script>
    import HomeContainer from "$lib/components/homeContainer.svelte";
	import PaymentModal from "$lib/components/PaymentModal.svelte";
    import { CheckCircle2 } from "@lucide/svelte";

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
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each data.policies as policy}
        <div class="stagger-item p-8 rounded-[2.5rem] bg-white/8 backdrop-blur-[20px] border border-white/5 flex flex-col hover:border-blue-500/30 transition-all hover:-translate-y-1">
            <h4 class="text-lg text-white font-bold">{policy.name}</h4>
            <p class="text-xs text-slate-500 mt-2 mb-8 grow leading-relaxed">{policy.description}</p>
                <span class="text-white">Base coverage: {policy.base_coverage}€</span>
            <div class=" flex justify-between items-center">
                <span class="text-2xl font-black text-blue-400">{policy.base_price}€</span>
                <button onclick={() => openPayment(policy)} class="px-5 text-white py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    Buy
                </button>
            </div>
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
