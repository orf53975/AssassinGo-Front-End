<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div id="mapper">
            <div class="sidemapper-container">
                <iframe :src="'http://www.visualsitemapper.com/map/'+target+'#sideMap'" frameborder="0" scrolling="no" marginheight="-200px" maiginweidth="-80px"></iframe>
            </div>
        </div>
    </TabBlock>
</template>

<script>
import TabBlock from './TabBlock'
export default {
    name: 'Sitemap',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Recon',
                subtitle: 'sitemap',
            },
            target: sessionStorage.getItem("target"),
        }
    },
}
</script>

<style scoped>
#mapper {
    height: 400px;
    width: 100%;
    overflow: hidden;
    margin: 20px 0;
}
.sidemapper-container {
    height: 556px;
    width: 100%;
    margin: -156px 0 0 0px;
}
.sidemapper-container > iframe {
    height: 100%;
    width: 100%;
}
</style>