<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="crawler-container">
            <div class="crawler-table-top">
                <div>#</div>
                <div>URL</div>
            </div>
            <div class="crawler-table-main">
                <div  class="crawler-table-item" v-for="(item, index) in urls" :key="index">
                    <div>{{index+1}}</div>
                    <div>{{item}}</div>
                </div>
            </div>
        </div>
    </TabBlock>
</template>

<script>
import TabBlock from './TabBlock'
export default {
    name: 'Crawler',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Attack',
                subtitle: 'crawler',
            },
            urls: [],
        }
    },
    methods: {
        showCrawler () {
            const url = '/attack/crawl';
            const msg = {
                max_depth: 4,
            };
            this.urls = [];
            this.ws(url, msg, this.addCrawler);
        },
        addCrawler (data) {
            this.urls.push(data.url);
        }
    },
    watch: {
        show: function () {
            if(this.show == true) {
                this.showCrawler();
            }
        }
    }
}
</script>

<style scoped>
.crawler-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 50px;
}
.crawler-table-top {
    height: 60px;
    line-height: 60px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    margin-bottom: 10px;
    border-bottom:  2px solid gray;
    color: gray;
    font-weight: bold;
}
.crawler-table-top > div:last-of-type {
    height: 100%;
}
.crawler-table-top > div:first-of-type {
    width: 100px;
}
.crawler-table-main {
    height: 447px;
    width: 100%;
}
.crawler-table-item {
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    word-break: break-all;
}
.crawler-table-item:nth-of-type(2n) {
    background: rgb(220, 220, 220);
}
.crawler-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
}
.crawler-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>