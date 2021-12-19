<script>

    import { toast } from 'bulma-toast'
    import { UserStore } from '../stores'
    import LocalstoreService from '../services/localstore.service'

    import UsersService from '../services/users.service'

    let loading = false
    getUser()

    let data={}

    async function getUser() {

        loading = true
        let userId = LocalstoreService.getItem('session')
        console.log(userId)
        const resp = await UsersService.getUser(userId.userId)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})

        UserStore.set(resp.data)
        data = {
            company: $UserStore.company,
            fullName: $UserStore.fullName,
            website: $UserStore.website,
            address: $UserStore.address,
            zipCode: $UserStore.zipCode,
            country: $UserStore.country,
            phone: $UserStore.phone,
            email: $UserStore.email,
            password: ''
        }
    }


    async function updateUser() {

        if(data.password !== data.passwordConfirm)
            return toast({message: 'password does not match', type: 'is-danger'})

        loading = true
        const resp = await UsersService.updateUser($UserStore._id, data)
        loading = false

        if(!resp.success)
            return toast({message: resp.error.message, type: 'is-danger'})

        UserStore.set(resp.data)

        toast({message: 'Update User', type: 'is-success'})
        
    }

</script>


{#if !loading}
    <form on:submit|preventDefault={updateUser}>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-building"></i></span>
                        <input bind:value={data.company} type="text" class="input is-rounded" placeholder="Your Company" required>
                    </div>
                </div>        
            </div>
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-user"></i></span>
                        <input bind:value={data.fullName} type="text" class="input is-rounded" placeholder="Your First and Last Name*" required>
                    </div>
                </div>        
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-globe"></i></span>
                        <input bind:value={data.website} type="text" class="input is-rounded" placeholder="Company Website*" required>
                    </div>
                </div>        
            </div>
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-map-marked-alt"></i></span>
                        <input bind:value={data.address} type="text" class="input is-rounded" placeholder="Company Address" >
                    </div>
                </div>        
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-street-view"></i></span>
                        <input bind:value={data.zipCode} type="text" class="input is-rounded" placeholder="City, State Zip" >
                    </div>
                </div>        
            </div>
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-globe-americas"></i></span>
                        <input bind:value={data.country} type="text" class="input is-rounded" placeholder="Country" >
                    </div>
                </div>
        
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-mobile"></i></span>
                        <input bind:value={data.phone} type="text" class="input is-rounded" placeholder="Phone*" required>
                    </div>
                </div>        
            </div>
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-user"></i></span>
                        <input bind:value={data.email} type="email" class="input is-rounded" placeholder="Email*" required>
                    </div>
                </div>        
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-lock"></i></span>
                        <input bind:value={data.password} type="password" class="input is-rounded" placeholder="Contraseña" required>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <div class="control has-icons-left" >
                        <span class="icon"><i class="fas fa-lock"></i></span>
                        <input bind:value={data.passwordConfirm} type="password" class="input is-rounded" placeholder="Contraseña" required>
                    </div>
                </div>        
            </div>
        </div>
        <div class="items-center space-top">
            <button type="submit" class="button is-warning is-fullwidth is-rounded">
                <span class="icon"><i class="fas fa-sign-in-alt"></i></span>
                <span>Update</span>
            </button>        
        </div>
    </form>
{/if}
