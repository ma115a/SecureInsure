<script>

    import {page} from '$app/stores'
	import { render } from 'svelte/server';
    import { tick } from 'svelte';


    let {policy, onPaymentSuccess} = $props()

    const script = document.createElement('script')
    script.src = "https://www.paypal.com/sdk/js?client-id=ATsNJWvUhMJZDj4y56Ec2p-DiU8mtGgEDsY-l2gO_4CVCBeg0vWM5RO4yI4PqngTUUAxl0gcPnDCWsVT&currency=EUR"

    let sdkLoaded = $state(false)
    let paypalContainer = $state()
    let isRendering = $state(false)



    async function renderButton() {
        if(window.paypal && paypalContainer || isRendering) {


            try {
                isRendering = true
                await tick()
                paypalContainer.innerHTML = ''

                window.paypal.Buttons({
                    style: {
                        layout : 'vertical',
                        color: 'blue',
                        shape: 'rect',
                        label : 'pay',
                        height: 50
                    },
                    createOrder: async () => {
                        try {
                            const res = await fetch('/api/create-order', {
                                method: 'POST',
                                headers: {'Content-Type' : 'application/json'},
                                body: JSON.stringify({
                                    policyId : policy.id,
                                    amount: policy.base_price
                                })
                            })

                            if(!res.ok) {
                                const errorData = await res.json()
                                throw new Error(errorData.message)
                                console.log('res not ok')
                            }

                            const order = await res.json()
                            console.log(order)
                            return order.id
                            
                        } catch (error) {
                            console.log(error)
                        }
                    },
                    onApprove: async(data) => {
                        try {
                            const res = await fetch('/api/capture-order', {
                                method: 'POST',
                                headers: {'Content-Type' : 'application/json'},
                                body: JSON.stringify({
                                    orderId : data.orderID,
                                    productId: policy.id
                                })
                            })
                            const result = await res.json()
                            if(result.success) {
                                //todo
                            }

                        } catch (error) {
                            console.log(error)

                        }
                    },
                    onCancel: () => {
                        console.log('cancelled')
                    },
                    onError: (err) => {
                        console.log(error)
                    }

                }).render(paypalContainer)
                
            } catch (error) {
               console.log(error) 
            }
        } else console.log('no paypal')
    }



    $effect(() => {
        const checkAndLoad = () =>{
            if(window.paypal) {
                sdkLoaded = true
                renderButton()
                return
            }
        }
        const scriptId = 'paypal-sdk-script';
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://www.paypal.com/sdk/js?client-id=ASuYQwHvylMxcOFJyqs35jQwHrjNaIV41-whKByL80SZa7_ha5PTErowSvET24-IfMqEUqgSTNcCY1gp&currency=USD`;
            script.async = true;
            document.body.appendChild(script);
        }

        script.onload = () => {
            sdkLoaded = true;
            renderButton();
        };
        
        script.onerror = () => {
            errorMessage = "Greška pri učitavanju PayPal skripte.";
        };

        checkAndLoad()
    })

</script>


<div bind:this={paypalContainer} class="w-full min-h-[150px] flex items-center justify-center">
    {#if !sdkLoaded}
        <div class="flex flex-col items-center gap-3">
            <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin">
            </div>
            <p class="text-white text-[10px] font-black uppercase tracking-widest"> PayPal initialization</p>
        </div>
    {/if}
</div>
