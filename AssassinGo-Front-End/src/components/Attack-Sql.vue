<template>
    <TabBlock :Tab="Tab" v-show="show" @refresh="refresh">
        <div class="sql-container">
            <div class="sql-table-top">
                <div>#</div>
                <div>URL</div>
            </div>
            <div class="sql-table-main">
                <div  class="sql-table-item" v-for="(item, index) in urls" :key="index">
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
    name: 'SQLI',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Attack',
                subtitle: 'sql',
                refresh: true,
            },
            urls: [],
        }
    },
    methods: {
        showSql () {
            const url = '/attack/sqli';
            const msg = {

            };
            this.urls = [];
            this.ws(url, msg, this.addSql);
        },
        addSql (data) {
            this.urls.push(data.sqli_url);
        },
        refresh (msg) {
            if(msg === true) {
                this.showSql();
            }
        }
    },
    watch: {
        show: function () {
            if(this.show == true && this.loadStatus.attackSqliAlreadyLoad != true) {
                this.showSql();
                this.alreadyLoad = true;
                this.loadStatus.load('attackSqliAlreadyLoad');
            }
        }
    }
}
</script>

<style scoped>
.sql-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 50px;
    overflow: auto;
}
.sql-table-top {
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
.sql-table-top > div:last-of-type {
    height: 100%;
}
.sql-table-top > div:first-of-type {
    width: 100px;
}
.sql-table-main {
    height: 447px;
    width: 100%;
}
.sql-table-item {
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
}
.sql-table-item:nth-of-type(2n) {
    background: rgb(220, 220, 220);
}
.sql-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
    overflow-x: auto;
    white-space: nowrap;
}
.sql-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>