<template>
    <div class="container">
        <el-input placeholder="请输要搜索的词汇" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleClick"></el-button>
        </el-input>
        <!-- <h3>{{ words }}</h3> -->
        <div ref="wordcloud" class="wordcloud">
            <wordcloud class="cloud" :data="words" nameKey="name" valueKey="value" v-if="words[0]" 
            :rotate="rotate" :fontSize="fontSize" wordPadding=5 :margin="margin" :showTooltip="showTooltip">
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
    height: 99%;
    width: 100%;

    .el-input-group {
        margin-top: 25px;
        width: 98%;
        margin-right: 25px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .wordcloud {
        height: 85%;
        margin-top: 25px;
        width: 98%;
        margin-right: 25px;
        .cloud{
            height: 100%;
            width: 100%;
        }
    }
}
</style>