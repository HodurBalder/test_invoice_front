<script>

    import { ModalStore } from '../stores'

    export let show

    $: show = $ModalStore === 'invoice'

    function onClose() {
        ModalStore.close()
    }

    window.onkeydown = function(event) {
        if(event.keyCode === 27)
            ModalStore.close
    }

</script>

{#if show}
    <div class="modal" class:is-active={show}>
        <div on:click={onClose} class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="columns">
                    <div class="column">
                        <button   class="is-2 is-offset-8 button is-warning ">
                            <span>Update Document</span>
                        </button>    
                    </div>
                    <div class="column">
                        <button  class="is-2 is-offset-8 button is-warning ">
                            <span>Download Now</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}