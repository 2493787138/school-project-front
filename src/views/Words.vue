<template>
    <div class="container">
        <h1>灵感关键词</h1>
        <el-input placeholder="请输要搜索的词汇" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleClick"></el-button>
        </el-input>
        <!-- <h3>{{ words }}</h3> -->
        <div ref="wordcloud" class="wordcloud">
            <wordcloud class="cloud" :data="words" nameKey="name" valueKey="value" v-if="words[0]" 
            :rotate="rotate" :fontSize="fontSize" wordPadding=8 :margin="margin" :showTooltip="showTooltip">
            </wordcloud>


        </div>
    </div>
</template>
<script>
import wordcloud from 'vue-wordcloud'
import { getWords } from '@/api'
var that

export default {
    name: 'app',
    components: {
        wordcloud
    },
    data() {
        return {
            search: '',
            words: [],
            rotate:{from: -90, to: 0, numOfOrientation: 2 },
            fontSize:[40,100],
            margin:{top: 0, right: 0, bottom: 0, left: 0 },
            showTooltip:false
        }
    },
    mounted() {
        that = this
    },
    methods: {
        RandomInt(min, max) {//在min和max之间取随机整数
            var res = Math.floor(Math.random() * (max - min + 1))
            res += min
            //console.log(res)
            return res
        },

        handleClick() {
            this.words=[]
            if (this.search.trim().length < 2) {
                alert('输入不得为空，且长度必须>=2')
                return
            }
            getWords({
                params: {
                    key: 'fca3de3d499093078229bf983fe84c55',
                    word: this.search,
                    num: 20
                }
            }).then((res) => {
                res.data.result.list[0].forEach(element => {
                    that.words.push({
                        name: element,
                        value: that.RandomInt(40, 60)
                    })

                });

            })
            console.log(this.words, 'words')
        }


    }
}
</script>
<style lang="less" scoped>
.container {
    height: 90%;
    width: 100%;

    h1{
        font-size: 40px;
        height: 10%;
        width: 100%;
        line-height: 250%;
        text-align: center;
        color: rgb(72,74 ,75);
    }

    .el-input-group {
        margin-top: 25px;
        margin-left:20% ;
        width: 60%;
        margin-right: 25px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .wordcloud {
        height: 60%;
        margin-top: 65px;
        width: 98%;
        margin-right: 25px;
        .cloud{
            height: 100%;
            width: 100%;
        }
    }
}
</style>