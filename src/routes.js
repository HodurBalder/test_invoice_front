import { wrap } from 'svelte-spa-router/wrap'
import Auth from './auth'

import LoginView from './users/login.view.svelte'
import InvoicesView from './invoices/view.invoices.svelte'
import SettingsView from './users/view.settings.svelte'

const routes = {

    '/': wrap({
        component: LoginView,
        conditions: [Auth.needLogin]
    }),

    '/invoices': wrap({
        component: InvoicesView,
        conditions: [Auth.isLogin]
    }),

    '/settings': wrap({
        component: SettingsView,
        conditions: [Auth.isLogin]
    }),
}

export { routes }