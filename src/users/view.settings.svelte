<script>
import Users from './component.user.svelte'
import Invoices from '../invoices/component.info.invoices.svelte'
import { replace } from 'svelte-spa-router'

let step = 'invoices'

function changeStep(){
        if (step === 'invoices'){
            step ='settings'
            replace('#/invoices')
        }else{
            step ='invoices'
            replace('#/settings')
        }
    }
    
</script>



<div class="container">
    <div class="column is-3">
        <button on:click={changeStep} type="button" class="button is-fullwidth is-rounded is-danger is-active">
            <span>{step}</span>
        </button>
    </div>
    <div class="columns">
        <div class="column">
            <Users />
        </div>
    </div>
    <br/>
    <br/>
    <div class="columns">
        <Invoices/>
    </div>
</div>



<!-- <Modal id="InvoiceRead" title="Factura" >
    <InvoiceRead on:deleted={InvoiceStore.modalClose} on:canceled={InvoiceStore.modalClose} />
</Modal> -->


<style>
    .container{
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        box-sizing: content-box;
        width: 100%;
        height: 120%;
        max-height: 3000px;
        margin: 0px auto;
        padding: 10%;
        perspective: 800px;
        background-color: rgb(242, 245, 248);
    }
</style>