<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="ssh-container">
            <div class="ssh-table-top">
                <div>id</div>
                <div>url</div>
            </div>
            <div class="ssh-table-main">
                <div  class="ssh-table-item" v-for="(item, index) in results" :key="index">
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
    name: 'Ssh',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: true,
            Tab: {
                title: 'Attack',
                subtitle: 'ssh',
            },
            results: [],
        }
    },
    methods: {
        showSsh () {
            const url = '/attack/ssh';
            const msg = {
                port: 22,
                user_list: "/dict/ssh-user-common.txt",
                passwd_list: "/dict/password.txt",
                concurrency: 40
            }
            this.results = [];
            this.ws(url, msg, this.addSsh);
        },
        addSsh (data) {
            this.results.push(data);
        }
    },
    mounted () {
        this.showSsh();
    }
}
</script>

<style scoped>
.ssh-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 50px;
}
.ssh-table-top {
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
.ssh-table-top > div:last-of-type {
    height: 100%;
}
.ssh-table-top > div:first-of-type {
    width: 100px;
}
.ssh-table-main {
    height: 447px;
    width: 100%;
}
.ssh-table-item {
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
}
.ssh-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
    overflow-x: scroll;
}
.ssh-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>