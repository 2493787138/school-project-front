<template>
    <div>
        <el-input placeholder="请输要搜索的词汇" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleClick"></el-button>
        </el-input>
        <h3>{{ words }}</h3>
        <div ref="wordcloud">
            <wordcloud :data="defaultWords" nameKey="name" valueKey="value" :color="myColors" :showTooltip="false"
                :wordClick="wordClickHandler">
            </wordcloud>


        </div>
    </div>
</template>
<script>
import wordcloud from 'vue-wordcloud'
import { getWords } from '@/api'
export default {
    data() {
        return {
            search: '',
            words: ''
        }
    },
    methods: {
        handleClick() {
            if (this.search.trim().length < 2) {
                alert('输入不得为空，且长度必须>=2')
                return
            }
            getWords({
                params: {
                    key: 'fca3de3d499093078229bf983fe84c55',
                    word: this.search,
                    num: 10
                }
            }).then((res) => {
                this.words = res.data.result.list
                //console.log(this.words)

            })
        }


    }
}
</script>
<style lang="less" scoped>
.el-input-group {
    margin-top: 25px;
    width: 98%;
    margin-right: 25px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>