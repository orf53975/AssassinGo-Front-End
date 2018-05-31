<template>
    <TabBlock :Tab="Tab" v-show="show" @refresh="refresh">
        <div class="ssh-container">
            <div class="ssh-table-top">
                <div>#</div>
                <div>URL</div>
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
    name: 'SSH',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Attack',
                subtitle: 'ssh',
                refresh: true,
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
        },
        refresh (msg) {
            if(msg === true) {
                this.showSsh();
            }
        }
    },
    watch: {
        show: function () {
            if(this.show == true && this.loadStatus.attackSshAlreadyLoad != true) {
                this.showSsh();
                this.alreadyLoad = true;
                this.loadStatus.load('attackSshAlreadyLoad');
            }
        }
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
    margin-bottom: 10px;
    border-bottom: 2px solid gray;
    color: gray;
    font-weight: bold;
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
.ssh-table-item:nth-of-type(2n) {
    background: rgb(220, 220, 220);
}
.ssh-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
    overflow-x: auto;
    white-space: nowrap;
}
.ssh-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>