<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="dirb-input-group">
            <input type="text" placeholder=".php" v-model="files">
            <div class="submit" @click="showDirb">扫描</div>
            <div class="stop" @click="stopDirb">停止</div>
        </div>
        <div class="dirb-container">
            <div class="dirb-table-top">
                <div>id</div>
                <div class="path">path</div>
                <div>responese</div>
                <div>length</div>
            </div>
            <div class="dirb-table-main">
                <div  class="dirb-table-item" v-for="(item, index) in paths" :key="index">
                    <div>{{index+1}}</div>
                    <div class="path">{{item.path}}</div>
                    <div>{{item.status}}</div>
                    <div>{{item.len}}</div>
                </div>
            </div>
        </div>
    </TabBlock>
</template>

<script>
import TabBlock from './TabBlock'
export default {
    name: 'Dirb',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: true,
            Tab: {
                title: 'Recon',
                subtitle: 'dirb',
            },
            paths: [],
            files: "",
            thisws: "",
        }
    },
    methods: {
        showDirb () {
            const url = '/info/dirb';
            const msg = {
                concurrency: 20,
                dict: this.files,
            };
            this.paths = [];
            this.thisws = this.ws(url, msg, this.addDirb);
        },
        addDirb (data) {
            console.log(data);
            this.paths.push(data);
        },
        stopDirb () {
            const msg = {
                stop: 1
            };
            this.thisws.send(JSON.stringify(msg));
        }
    },
    mounted () {
        
    }
}
</script>

<style scoped>
.dirb-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 25px;
    padding-top: 0px;
}
.dirb-input-group {
    height: 75px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 25px;
}
.dirb-input-group > input{
    height: 30px;
    width: 200px;
    border: 1px solid gray;
}
.dirb-input-group > div {
    height: 32px;
    width: 50px;
    line-height: 30px;
    border: 1px solid gray;
    border-left: none;
    cursor: pointer;
}
.dirb-table-top {
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
.dirb-table-top > div {
    height: 100%;
    width: 100px;
}
.path {
    flex-grow: 1;
}
.dirb-table-main {
    height: 447px;
    width: 100%;
}
.dirb-table-item {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: break-all;
}
.dirb-table-item > div {
    height: 100%;
    width: 100px;
    text-align: center;
}
</style>