<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="subdomain-container">
            <div class="subdomain-table-top">
                <div>#</div>
                <div>URL</div>
            </div>
            <div class="subdomain-table-main">
                <div  class="subdomain-table-item" v-for="(item, index) in subdomains" :key="index">
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
    name: 'Subdomain',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Recon',
                subtitle: 'subdomain',
            },
            subdomains: [],
        }
    },
    methods: {
        showSubdomain () {
            const url = '/info/subdomain';
            const msg = {

            };
            this.subdomains = [];
            this.ws(url, msg, this.addSubdomain);
        },
        addSubdomain (data) {
            this.subdomains.push(data.subdomain);
        }
    },
    watch: {
        show: function () {
            if(this.show == true) {
                this.showSubdomain();
            }
        }
    }
}
</script>

<style scoped>
.subdomain-container {
    width: 100%;
    height: 607px;
    box-sizing: border-box;
    padding: 50px;
    overflow: auto;
}
.subdomain-table-top {
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
.subdomain-table-top > div:last-of-type {
    height: 100%;
}
.subdomain-table-top > div:first-of-type {
    width: 100px;
}
.subdomain-table-item:nth-of-type(2n) {
    background: rgb(220, 220, 220);
}
.subdomain-table-main {
    height: 447px;
    width: 100%;
}
.subdomain-table-item {
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
}
.subdomain-table-item > div:last-of-type {
    height: 100%;
    flex-grow: 1;
    text-align: left;
    /* overflow-x: scroll; */
}
.subdomain-table-item > div:first-of-type {
    width: 100px;
    min-width: 100px;
    text-align: center;
}
</style>