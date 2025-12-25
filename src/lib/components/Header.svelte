
<script>
    let activeNav = 'dashboard'
    import gsap from 'gsap'
    import { page } from '$app/stores';


    let headerRef

    let user = $page.data.user
    $effect(() => {

        const tl = gsap.timeline()
        tl.to(headerRef, {opacity: 1, y: 0, duration: 1, ease:"power4.out"})
    })



</script>

<header bind:this={headerRef} class="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0d111c]/90 backdrop-blur-[20px] border-b border-white/5 px-8  opacity-0">
        <div class="mx-auto h-full flex items-center justify-between">
            <div class="flex items-center gap-12">
                <a href="/"><h1 class="text-2xl font-black italic tracking-tighter text-white cursor-pointer" >Secure<span class="text-blue-500">Insure</span></h1></a>
                
<nav class="hidden md:flex items-center gap-8">
                    <a 
                        href="/" 
                        class="nav-link text-sm font-bold transition-all"
                        class:active={$page.url.pathname === '/'}
                    >
                        Dashboard
                    </a>
                    <a 
                        href="/policies" 
                        class="nav-link text-sm font-bold transition-all"
                        class:active={$page.url.pathname === '/policies'}
                    >
                        Buy policies
                    </a>
                </nav>
            </div>

            <div class="flex items-center gap-4">
                <div class="text-right hidden sm:block">
                    <p class="font-bold text-white text-xs">{user.name} {user.lastname}</p>
                </div>
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold border border-white/10 shadow-lg shadow-blue-600/20">
                {user.name.split('')[0]}{user.lastname.split('')[0]}
                </div>
            </div>
        </div>
    </header>

    <style>
    .nav-link {
        color: #94a3b8; /* slate-400 */
        position: relative;
    }

    .nav-link:hover {
        color: white;
    }

    .nav-link.active {
        color: white;
    }

    /* Active indicator sa tvojim stilom */
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #3b82f6;
        border-radius: 2px;
        box-shadow: 0 0 10px #3b82f6;
    }
</style>
