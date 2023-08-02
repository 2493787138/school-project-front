<template>
<div>
    <div>

    </div>
</div>
</template>
<script>
import {test} from '../api/index'
export default{
    mounted(){
        test({name:'name'}).then(( res ) => {
            console.log(res.headers,'res')
        })
    }
}
</script>
<style>

</style>