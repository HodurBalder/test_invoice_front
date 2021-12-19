<script>
    import { toast } from 'bulma-toast'
    import { replace } from 'svelte-spa-router'
    import { UserStore, SessionStore } from '../stores'

    import UsersService from '../services/users.service'
    import LocalstoreService from '../services/localstore.service'



    let data = {}
    let loading = false

    async function login() {

        loading = true
        const resp = await UsersService.userLogin(data)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})
        
        UserStore.set(resp.data.user)
        SessionStore.set(resp.data.session)
    
        console.log($UserStore)
        LocalstoreService.setItem('session', resp.data.session)


        replace('#/invoices')
    }

</script>


{#if !loading}
    <form on:submit|preventDefault={login}>
        <div class="field">
            <label for=""  class="label" style="color: whitesmoke;">Correo</label>
            <div class="control has-icons-left" id="email">
                <span class="icon"><i class="fas fa-user"></i></span>
                <input bind:value={data.email} type="text" class="input is-rounded" placeholder="Correo" required>
            </div>
        </div>
        <div class="field">
            <label for=""  class="label" style="color: whitesmoke;">Contraseña</label>
            <div class="control has-icons-left" id="email">
                <span class="icon"><i class="fas fa-lock"></i></span>
                <input bind:value={data.password} type="password" class="input is-rounded" placeholder="Contraseña" required>
            </div>
        </div>
        
        <div class="items-center space-top">
            <button type="submit" class="button is-warning is-fullwidth is-rounded">
                <span>Ingresar</span>
            </button>        
        </div>
    </form>
{/if}

