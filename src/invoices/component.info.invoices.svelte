<script>
    import Moment from 'moment'
    import { toast } from 'bulma-toast'
    import { UserStore, InvoiceStore, InvoicesStore } from '../stores'

    import InvoicesService from '../services/invoices.service'
    import { replace } from 'svelte-spa-router';
    

    let loading = false
    let invoices
    $: invoices = $InvoicesStore
    
    getInvoices()

    async function getInvoices() {

        loading = true
        const resp = await InvoicesService.getInvoices($UserStore._id)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})

        InvoicesStore.set(resp.data)
    }

    function dateShort(value = new Date()) {
        return Moment(value).locale('es').format('DD.MMM.YYYY')
    }

    function updateInvoice(invoice){
        InvoiceStore.set(invoice)
        replace('#/invoices')

    }
    async function deleteInvoice(invoice) {
        
        loading = true
        const resp = await InvoicesService.deleteInvoice(invoice._id)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})

        SchemesStore.remove($InvoiceStore._id)
        SchemeStore.set(null)

        toast({message: 'Invoice Delete', type: 'is-success'})
    }

</script>

{#if invoices != undefined }
<table class="table is-fullwidth is-hoverable">
    <thead>
        <tr>
            <th>#</th>
            <th>Client Company</th>
            <th>Client Name</th>
            <th>Invoice Date</th>
            <th>Total</th>
            <th>Look</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {#each invoices as invoice, index}
            <tr>
                <td>{ index+1 }</td>
                <td>{ invoice.companyClient }</td>
                <td>{ invoice.fullNameClient }</td>
                <td>{ dateShort(invoice.invoiceDate) }</td>
                <td>{ invoice.total }</td>
                <td>
                    <span on:click={() => updateInvoice(invoice)} class="icon"><i class="fas fa-eye"></i></span>
                </td>
                <td>
                    <span on:click={() => deleteInvoice(invoice)} class="icon"><i class="fas fa-trash-alt"></i></span>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
{/if}