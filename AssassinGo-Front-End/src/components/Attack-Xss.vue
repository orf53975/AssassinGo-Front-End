<template>
    <TabBlock :Tab="Tab" v-show="show" @refresh="refresh">
        <div class="xss-container">
            <div class="xss-table-top">
                <div>#</div>
                <div>URL</div>
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
    name: 'XSS',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Attack',
                subtitle: 'xss',
                refresh: true,
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
        },
        refresh (msg) {
            if(msg === true) {
                this.showXss();
            }
        }
    },
    watch: {
        show: function () {
            if(this.show == true && this.loadStatus.attackXssiAlreadyLoad != true) {
                this.showXss();
                this.loadStatus.load('attackXssiAlreadyLoad');
            }
        }
    }
}
</script>

<style scoped>
.xss-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 50px;
    overflow: auto;
}
.xss-table-top {
    height: 60px;
    line-height: 60px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    margin-bottom: 10px;
    border-bottom: 2px solid gray;
    color: gray;
    font-weight: bold;
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
.xss-table-item:nth-of-type(2n) {
    background: rgb(220, 220, 220);
}
.xss-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
    overflow-x: auto;
    white-space: nowrap;
}
.xss-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>