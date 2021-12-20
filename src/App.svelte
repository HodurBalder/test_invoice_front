<script>
    import 'bulma/css/bulma.css'
    import Router, { replace } from "svelte-spa-router"
    import { routes } from "./routes"
    import { SessionStore, UserStore } from './stores'

    import LocalstoreService from './services/localstore.service'
    import UsersService from './services/users.service'


    function failed(event) {

        if(event.detail.route === '/')
            return replace('#/invoices')

        if(event.detail.route != '/')
            return replace('/')
    }

    async function loaded(event) {

        const lastAccess = LocalstoreService.getItem('access')

        if(event.detail.route != '/') {
            
            const resp = await UsersService.verifyToken($SessionStore.token)

            if(resp.error)
                return logout(resp.error.message)

            if(resp.data.user._id != $UserStore._id)
                return logout('Acceso incorrecto')
        }
    }

    function logout(message) {
        LocalstoreService.deleteItem('user')
        LocalstoreService.deleteItem('session')
        toast({message, type: 'is-danger'})
        replace('/')
    }

</script>

<style>
    .app-size {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
    }
</style>

<div id="app" class="app-size" >
    <Router {routes}
    on:routeLoaded={loaded}
    on:conditionsFailed={failed}
/>
</div>