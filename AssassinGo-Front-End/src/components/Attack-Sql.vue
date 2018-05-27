<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="sql-container">
            <div class="sql-table-top">
                <div>id</div>
                <div>url</div>
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
    name: 'Sql',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: true,
            Tab: {
                title: 'Attack',
                subtitle: 'sql',
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
        }
    },
    mounted () {
        this.showSql();
    }
}
</script>

<style scoped>
.sql-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 50px;
}
.sql-table-top {
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
.sql-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
    overflow-x: scroll;
}
.sql-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>