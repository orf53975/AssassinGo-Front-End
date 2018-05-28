<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="dirb-input-group">
            <input type="text" placeholder=".php" v-model="files">
            <div class="submit" @click="showDirb">SCAN</div>
            <div class="stop" @click="stopDirb">STOP</div>
        </div>
        <div class="dirb-container">
            <div class="dirb-table-top">
                <div>#</div>
                <div class="path">PATH</div>
                <div>RESPONSE</div>
                <div>LENGTH</div>
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
            show: false,
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
    border: 1px solid black;
}
.dirb-input-group > input:focus {
    outline: none;
    border: 1px solid black;
}
.dirb-input-group > div {
    height: 32px;
    width: 80px;
    line-height: 30px;
    border: 1px solid black;
    border-left: none;
    cursor: pointer;
}
.dirb-input-group > div:hover {
    background: #e56845;
    color: white;
}
.dirb-table-top {
    height: 60px;
    line-height: 60px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    border-bottom: 2px solid gray;
    color: gray;
    font-weight: bold;
    margin-bottom: 10px;
}
.dirb-table-top > div {
    height: 100%;
    width: 100px;
}
.path {
    flex-grow: 1;
    text-align: left !important;
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