<script>
    import { toast } from 'bulma-toast'
    import {  UserStore, InvoiceStore, InvoicesStore} from '../stores'
    import InvoiceService from '../services/invoices.service'
    import { replace } from 'svelte-spa-router'
    import LocalstoreService from '../services/localstore.service'
    import UsersService from '../services/users.service'

    let user
    let loading = false
    let id 
    let description 
    let units 
    let price 
    let data
    let rows
    let subtotal
    let tax
    let discount
    let total = 0
    let  logo
    let fileinput;
	
    $: rows = data.concepts    
    $: subtotal = sum(rows, tax, discount, total)
    $: user = $UserStore
    data = {
        concepts: [],
        subtotal,
        tax, 
        discount,
        total
    }
    if($InvoiceStore != undefined)
        data = $InvoiceStore

    function sum(array){
        let subtotal = 0
        array.forEach(item => {
          if((item.price * item.units) >= 0)
            total = subtotal = subtotal + item.price * item.units 
        })
        if(subtotal >= 0 && tax > 0)
            total = subtotal * (1+tax/100)

        if(subtotal >= 0 && discount >= 1)
            total = total * (1-discount/100)
        
        return subtotal   
    }
    
    const onFileSelected =(e)=>{
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
                logo = e.target.result
        };
    }
	
    function addRow(){
        data.concepts = [...data.concepts,{id, description, units, price}]
    }
    function deleteRow(index){

    }

    getUser()
    async function getUser() {

        loading = true
        let userId = LocalstoreService.getItem('session')
        console.log(userId)
        const resp = await UsersService.getUser(userId.userId)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})

        UserStore.set(resp.data)
        
    }

    async function createInvoice() {
        data.subtotal =subtotal
        data.tax = tax
        data.discount= discount
        data.total=total
        loading = true
        const resp = await InvoiceService.createInvoice(data)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})

        InvoicesStore.append(resp.data)
        toast({message: 'Invoice Created', type: 'is-success'})
        replace('#/settings')

    }

    async function updateInvoice() {
        loading = true
        const resp = await InvoiceService.updateInvoice($InvoiceStore._id, data)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})

        InvoiceStore.set(resp.data)
        InvoicesStore.replace(resp.data)
        toast({message: 'Invoice Updated', type: 'is-success'})
        replace('#/settings')
    }

</script>
<div>
<div class="container columns">
    <div class="pdf column">
        <div class="columns ">
            <div class="column">
                <h2>Invoice</h2>
                <div class="user-data">
                    <input bind:value={user.company} type="text" class="hubspot" placeholder="Your Company*" required/>
                    <input bind:value={user.fullName} type="text" class="hubspot" placeholder="Your First and Last Name*" required/>
                    <input bind:value={user.website} type="text" class="hubspot" placeholder="Company Website*" required/>
                    <input bind:value={user.address} type="text" class="hubspot" placeholder="Company Address"/>
                    <input bind:value={user.zipCode} type="text" class="hubspot" placeholder="City, State Zip"/>
                    <input bind:value={user.country} type="text" class="hubspot" placeholder="Country"/>
                    <input bind:value={user.phone} type="text" class="hubspot" placeholder="Phone*" required/>
                    <input bind:value={user.email} type="email" class="hubspot" placeholder="Email*" required/>
                </div>
                <br/>
                <div class="client-data">
                    <input bind:value={data.companyClient} type="text" class="hubspot" placeholder="Your Company*" required/>
                    <input bind:value={data.fullNameClient} type="text" class="hubspot" placeholder="Your First and Last Name*" required/>
                    <input bind:value={data.addressClient} type="text" class="hubspot" placeholder="Company Address"/>
                    <input bind:value={data.zipCodeClient} type="text" class="hubspot" placeholder="City, State Zip"/>
                    <input bind:value={data.countryClient} type="text" class="hubspot" placeholder="Country"/>
                    
                </div>
            </div>
            <div class="column">
                <div class="columns">
                    <div class="column">
                        <div id="app">
                            <input style="display:none" type="file" accept="image/*" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} />
                            {#if logo}
                                <img class="logo" src="{logo}" alt="" />
                            {:else}
                                <span on:click={()=>{fileinput.click();}} class="logo">Drag & drop a logo file or click to upload</span>
                            {/if}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div class="column">
                            <div class="columns">
                                <div class="column">
                                    <label for=""  class="has-text-right hubspot label" style="color: #425B76">Invoice No.</label>
                                    <label for=""  class="has-text-right hubspot label" style="color: #425B76">Invoice Date</label>
                                    <label for=""  class="has-text-right hubspot label" style="color: #425B76">Due Date</label>
                                </div>
                                <div class="column">
                                    <input bind:value={data.invoiceId} type="text" class=" has-text-right hubspot label" placeholder="###"/>
                                    <input bind:value={data.invoiceDate} type="date" class=" has-text-right hubspot label" placeholder="City, State Zip"/>
                                    <input bind:value={data.dueDate} type="date" class="has-text-right hubspot label" placeholder="Country"/>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <table class="table is-fullwidth" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Quantit</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
            </thead>
            <tfoot>
            </tfoot>
            <tbody>
                {#each rows as row, index}
                    <tr>
                        <td><input bind:value={row.id} type="text" class=" has-text-left hubspot label" placeholder={index}/></td>
                        <td><input bind:value={row.description} type="text" class=" has-text-left hubspot label" placeholder="Item description"/></td>
                        <td><input bind:value={row.units} type="text" class=" has-text-left hubspot label" placeholder="0"/></td>
                        <td><input bind:value={row.price} type="text" class=" has-text-left hubspot label" placeholder="$0.00"/></td>
                        <td><span on:click={() => deleteRow(index)}><i class="fas fa-times-circle"></i></span></td>
                    </tr>
                {/each}
            </tbody>
            </table>    
        </div>
        <div class="columns">
            <button on:click={addRow} class="button is-warning is-fullwidth">
                        <span>+ Add More</span>
            </button>
        </div>
        <br/>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <p class="has-text-centered">Notes:</p>
                    <textarea bind:value={data.notes} class="hubspot has-text-centered" placeholder="Any additional comments"/>
                </div>
            </div>
            <div class="column">
                <div class="columns">
                    <div class="column">
                        <p>Subtotal:</p>
                        <p>Tax:</p>
                        <p>Discount:</p>
                        <p>Total:</p>
                    </div>
                    <div class="column">
                        <p class="has-text-right">{subtotal}</p>
                        <input bind:value={tax} type="text" class=" has-text-right hubspot" placeholder="0"/>
                        <input bind:value={discount} type="text" class=" has-text-right hubspot" placeholder="0"/>
                        <p class="has-text-right" >{total} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <button  on:click={createInvoice} class="buttonend column is-2 is-offset-2 button is-warning ">
        <span>Save</span>
    </button>
    <button  on:click={updateInvoice} class="buttonend column is-2 is-offset-8 button is-warning ">
        <span>Update</span>
    </button>

</div>






<style>

    .pdf{
        position: relative;
        display: flex;
        flex-direction: column;
        -webkit-box-pack: justify;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 3000px;
        padding: 1.5em 3em;
        color: rgb(45, 62, 80);
        backface-visibility: hidden;
        border: 1px solid rgb(242, 245, 248);
        border-radius: 0.2em;
        background-color: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 50%) 0px 0.5em 1.5em -0.5em;
        transition: transform 0.5s ease 0s;
        margin: 0;
    }

    .user-data {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0px auto;
    }

    .client-data {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0px auto;
    }


    .logo{
        font-size: 1.5em;
        left: 0px;
        width: 55%;
        height: 35%;
        border-style: dashed;
        border-color: rgb(255, 115, 1);
        text-align: center;
        width: 50%;
        max-width: 60%;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        margin-left: auto;
        overflow: hidden;
        border: 2px dashed rgb(253, 143, 95);
        transform: scale(1);
        transition: transform 0.3s ease 0s;
        cursor: pointer;
    }


    

    .container{
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        box-sizing: content-box;
        width: 100%;
        height: 120%;
        max-height: 3000px;
        margin: 0px auto;
        padding: 6em 0px;
        perspective: 800px;
        background-color: rgb(242, 245, 248);
    }
    .hubspot{
        width: 100%;
        font-size: 1.2em;
        font-weight: 600;
        text-align: left;
        color: rgb(45, 62, 80);
        outline: none;
        border: 1px dashed transparent;
        background-color: transparent;
        overflow: visible;
        border-style: dashed;
    }

    .hubspot:hover{
        border-style: dashed;
        border-color: rgb(255, 115, 1);
    }

    h2{
        font-size: 2rem;
        line-height: 1.3125em;
        font-weight: 700;
        color: inherit;
        font-family: inherit;
        margin: 0.5em 0;

    }
    
    #app{
        display:flex;
        align-items:center;
        justify-content:center;
        flex-flow:column;
    }
 
	.logo{
		display:flex;
		height:200px;
		width:200px;
	}
    table thead {
        background-color: #425B76;
    }

    table th {
        color: white;
    }
    .buttonend{
        margin-top: -60px;
    }
</style>