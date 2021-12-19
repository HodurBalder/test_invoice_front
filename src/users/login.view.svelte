<script>

    import UsersLoginComponent from './component.login.svelte'
    import UsersRegisterComponent from './component.register.svelte'

    let step = 'Sign up'
    
    function changeStep(){
        if (step === 'Sign in'){
            step = 'Sign up'
        }else{
            step = 'Sign in'
        }
    }

</script>

<style>

    .hero {
        background: #473433;
    }

    .title, .subtitle {
        color: whitesmoke;
        padding-left: 32px;
    }




</style>

<section class="hero is-fullheight">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-mobile is-centered">
                <div class="column is-2">
                    <p class="title">Test LA</p> 
                    <p class="subtitle">Invoices Generate</p>
                </div>
                <div class="column is-3">
                    <button on:click={changeStep} type="button" class="button is-fullwidth is-rounded is-danger is-active">
                        <span>{step}</span>
                    </button>
                </div>
            </div>       
            <div class="columns is-mobile is-centered">
                <div class="column is-6">
                    {#if step === 'Sign up'}
                        <UsersLoginComponent />         
                    {/if}
                    {#if step === 'Sign in'}
                        <UsersRegisterComponent />         
                    {/if}
                </div>        
            </div>
        </div>
    </div>
</section>
