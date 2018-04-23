<template>
    <TabBlock :Tab="Tab">
        <div class="seek-container">
            <div class="seek-search-container">
                <div class="seek-checkbox">
                    <label for="checkbox">域名处理</label>
                    <input type="checkbox" id="checkbox">
                </div>
                <div class="seek-select-container">
                    <i class="fa fa-angle-down fa-lg angle"></i>
                    <div class="seek-select">
                        <i class="fa fa-google fa-lg"></i>
                        <div class="seek-options-container">
                            <div class="seek-options">
                                <i class="fa fa-paw fa-lg"></i>
                            </div>
                            <div class="seek-options">
                                <i class="fa fa-git fa-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="text" class="seek-search-input" placeholder="KeyWord">
                <input type="text" class="seek-page-size-input" placeholder="PageSize">
                <div class="seek-search">
                    搜索
                </div>
                <div class="seek-help">
                    <i class="fa fa-question-circle fa-lg"></i>
                    使用帮助
                </div>
            </div>
            <div class="warning">warning</div>
            <div class="seek-result-container">
                <div class="seek-result-top-container">
                    <div class="seek-result-id">id</div>
                    <div class="seek-result-url">url</div>
                    <div class="seek-result-title">title</div>
                </div>
                <div class="seek-result-main-container">
                    <div class="seek-result-main-item" v-for="j in 10" :key="j">
                        <div class="seek-result-id">{{j}}</div>
                        <div class="seek-result-url">{{j}}</div>
                        <div class="seek-result-title">{{j}}</div>
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
            Tab: {
                title: 'Seek',
                subtitle: 'seek'
            }
        }
    },
}
</script>

<style scoped>
.seek-container {
    width: 100%;
    height: 507px;
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
.seek-search {
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
    height: 340px;
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
    box-shadow: 0 0 2px gray;
}
.seek-result-top-container {
    margin-bottom: 5px;
}
.seek-result-main-item {
    box-shadow: none;
}
.seek-result-main-container {
    width: 100%;
    height: 280px;
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
    line-height: 50px;
    text-align: center;
}
</style>