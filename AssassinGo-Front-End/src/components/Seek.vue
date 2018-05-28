<template>
    <TabBlock :Tab="Tab">
        <div class="seek-container">
            <div class="seek-search-container">
                <div class="seek-select-container">
                    <i class="fa fa-angle-down fa-lg angle"></i>
                    <div class="seek-select">
                        <div class="seek-options" v-show="se == 'google'">
                            <i class="fa fa-google fa-lg"></i>
                        </div>
                        <div class="seek-options bing-icon" v-show="se == 'bing'">
                                <img src="../../static/images/bingIcon.jpeg">
                        </div>
                        <div class="seek-options-container">
                            <div class="seek-options bing-icon" v-show="se != 'bing'" @click="changeSe('bing')">
                                <img src="../../static/images/bingIcon.jpeg">
                            </div>
                            <div class="seek-options" v-show="se != 'google'"  @click="changeSe('google')">
                                <i class="fa fa-google fa-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="text" class="seek-search-input" placeholder="KeyWord" v-model="keyword">
                <input type="text" class="seek-page-size-input" placeholder="PageSize" v-model="pagesize">
                <div class="seek-search" @click="doSeek">
                    SEARCH
                </div>
                <div class="seek-checkbox">
                    <label for="checkbox">Domain Treatment</label>
                    <input type="checkbox" id="checkbox" v-model="checkbox">
                </div>
                <!-- <div class="seek-help">
                    <i class="fa fa-question-circle fa-lg"></i>
                    使用帮助
                </div> -->
            </div>
            <div class="warning" v-show="warningStatus">warning</div>
            <div class="seek-result-container">
                <div class="seek-result-top-container">
                    <div class="seek-result-id">#</div>
                    <div class="seek-result-url">URL</div>
                    <!-- <div class="seek-result-title">title</div> -->
                </div>
                <div class="seek-result-main-container" v-show="checkbox == false">
                    <div class="seek-result-main-item" v-for="(item, index) in urls" :key="index">
                        <div class="seek-result-id">{{index+1}}</div>
                        <div class="seek-result-url">{{item}}</div>
                        <!-- <div class="seek-result-title">{{j}}</div> -->
                    </div>
                </div>
                <div class="seek-result-main-container" v-show="checkbox == true">
                    <div class="seek-result-main-item" v-for="(item, index) in hosts" :key="index">
                        <div class="seek-result-id">{{index+1}}</div>
                        <div class="seek-result-url">{{item}}</div>
                        <!-- <div class="seek-result-title">{{j}}</div> -->
                    </div>
                </div>
            </div>
        </div>
    </TabBlock>
</template>

<script>
import TabBlock from '../components/TabBlock'
export default {
    name: 'Seek',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Seek',
                subtitle: 'seek'
            },
            se: "bing",
            keyword: "",
            pagesize: "",
            checkbox: true,
            urls: [],
            warningStatus: false,
        }
    },
    computed: {
        hosts () {
            let temp = [];
            for(let i in this.urls) {
                temp.push(/^(http|https):\/\/[0-9a-zA-z\.]+\//.exec(this.urls[i])[0]);
            }
            return temp;
        }
    },
    methods: {
        changeSe(name) {
            this.se = name;
        },
        doSeek () {
            const url = "/seek";
            const msg = {
                query: this.keyword,
                se: this.se,
                max_page: parseInt(this.pagesize),
            };
            this.urls = [];
            this.ws(url, msg, this.showSeek);
        },
        showSeek (data) {
            for(let i in data.urls) {
                this.urls.push(data.urls[i]);
            }
        }
    }
}
</script>

<style scoped>
.seek-container {
    width: 100%;
    height: 607px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.seek-search-container {
    height: 100px;
    width: 100%;
    margin: 20px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.seek-select-container {
    height: 50px;
    width: 80px;
    box-sizing: border-box;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid gray;
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.angle {
    font-size: 12px;
    margin-right: 10px;
}
.seek-select {
    position: relative;
    height: 100%;
    width: 25px;;
}
.seek-select:hover .seek-options-container {
    display: block;
}
.seek-select i {
    margin: 17px 0;
    text-decoration: none;
}
.seek-search-input,
.seek-page-size-input {
    height: 50px;
    width: 360px;
    box-sizing: border-box;
    padding: 0 20px;
    border: 1px solid gray;
    font-size: 16px;
}
.seek-page-size-input {
    width: 120px;
    border-left: none;
}
.seek-search-input:focus {
    outline: none;
    border: 1px solid gray;
}
.seek-page-size-input:focus {
    outline: none;
    border: 1px solid gray;
    border-left: none;
}
.seek-options-container {
    display: none;
}
.seek-options {
    cursor: pointer;
}
.seek-search {
    cursor: pointer;
    height: 50px;
    width: 80px;
    line-height: 50px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid gray;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.seek-checkbox {
    margin: 0 15px;
}
.seek-help {
    height: 50px;
    width: 120px;
    line-height: 50px;
    text-align: center;
    text-decoration: underline;
}
.seek-result-container {
    height: 540px;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.seek-result-top-container,
.seek-result-main-item {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.seek-result-top-container {
    margin-bottom: 10px;
    border-bottom: 2px solid gray;
    color: gray;
    font-weight: bold;
}
.seek-result-main-item {
    box-shadow: none;
}
.seek-result-main-item:nth-of-type(2n) {
    background: rgb(220, 220, 220);
    color: #e56845;
}
.seek-result-main-container {
    width: 100%;
    height: 480px;
    box-sizing: border-box;
    overflow: auto;
}
.seek-result-id {
    height: 100%;
    width: 60px;
    line-height: 50px;
    text-align: center;
    /* border: 1px solid gray; */
}
.seek-result-url,
.seek-result-title {
    height: 100%;
    flex-grow: 1;
    max-width: 1100px;
    line-height: 50px;
    text-align: left;
    word-break: break-all;
    overflow: hidden;
}
.bing-icon {
    height: 50px;
    width: 25px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bing-icon > img {
    height: auto;
    width: 100%;
    filter: grayscale(100%);
}
</style>