<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="xss-container">
            <div class="xss-table-top">
                <div>id</div>
                <div>url</div>
            </div>
            <div class="xss-table-main">
                <div  class="xss-table-item" v-for="(item, index) in urls" :key="index">
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
    name: 'Xss',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: true,
            Tab: {
                title: 'Attack',
                subtitle: 'xss',
            },
            urls: [],
        }
    },
    methods: {
        showXss () {
            const url = '/attack/xss';
            const msg = {

            };
            this.urls = [];
            this.ws(url, msg, this.addxss);
        },
        addXss (data) {
            this.urls.push(data.xssi_url);
        }
    },
    mounted () {
        this.showXss();
    }
}
</script>

<style scoped>
.xss-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 50px;
}
.xss-table-top {
    height: 60px;
    line-height: 60px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    box-shadow: 0 0 5px gray;
    margin-bottom: 5px;
}
.xss-table-top > div:last-of-type {
    height: 100%;
}
.xss-table-top > div:first-of-type {
    width: 100px;
}
.xss-table-main {
    height: 447px;
    width: 100%;
}
.xss-table-item {
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
}
.xss-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
    overflow-x: scroll;
}
.xss-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>