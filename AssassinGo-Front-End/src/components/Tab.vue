<template>
    <div>
        <div class="tab">
            <div class="tab-title">
                <div v-for="item in tabNames" :key="item" @click="changeTab(item)" :class="[item == currentTabName ? 'active' : '']">
                    {{item}}
                </div>
            </div>
            <div class="tab-main">
                <i class="fa fa-chevron-left fa-3x" :style="{'visibility': beforeTab != undefined ? 'visible' : 'hidden'}" @click="changeTab(beforeTab)"></i>
                <slot></slot>
                <i class="fa fa-chevron-right fa-3x" :style="{'visibility': afterTab != undefined ? 'visible' : 'hidden'}" @click="changeTab(afterTab)"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentTabName: "",
            tabs: [],
            tabNames: [],
        }
    },
    computed: {
        beforeTab () {
            return this.tabNames[this.tabNames.indexOf(this.currentTabName) - 1];
        },
        afterTab () {
            return this.tabNames[this.tabNames.indexOf(this.currentTabName) + 1];
        }
    },
    methods: {
        changeTab (name) {
            this.currentTabName = name;
            this.setShowStatus();
        },
        getTabs () {
            this.currentTabName = this.$children[0].$options.name;
            this.$children.filter( item => {
                this.tabs.push(item);
                this.tabNames.push(item.$options.name);
            });
            this.setShowStatus();
        },
        setShowStatus () {
            this.tabs.forEach((tab, index) => {
                tab.show = (tab.$options.name == this.currentTabName)
            })
        }
    },
    mounted () {
        this.getTabs();
    }
}
</script>

<style scoped>
.tab {
    width: 100%;
    height: 100%;
}
.tab-title {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 120px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 120px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-top: 1px solid rgb(226, 226, 226); */
    /* box-shadow: 0 0 4px gray; */
}
.tab-title > div {
    height: 30px;
    min-width: 60px;
    padding: 0 5px;
    line-height: 30px;
    text-align: center;
    margin: 0 20px;
    background: white;
    color: black;
    cursor: pointer;
}
.tab-title > div.active {
    background: black;
    color: white;
}
.tab-title > div:hover {
    background: black;
    color: white;
}
.tab-main {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tab-main > i {
    color: black;
    margin: 0 30px;
    cursor: pointer;
}

</style>