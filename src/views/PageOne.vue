<template>
    <h1>我是PageOne</h1>
</template>
<script>
import { test, test2 } from '../api'
export default {
    data() {
        return {
            testData: ''
        }
    },
    mounted() {
        test().then(({ data }) => {
            console.log(data, '测试成功')
        })
        test2({ params: { age: 18 } }).then(({ data }) => {
            console.log(data,'测试2')

        })
    }
}
</script>