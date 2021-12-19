<script>
    import 'bulma/css/bulma.css'
    import Router from "svelte-spa-router"
    import { routes } from "./routes"
</script>

<style>
    .app-size {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
    }
</style>

<div id="app" class="app-size" >
    <Router {routes} />
</div>