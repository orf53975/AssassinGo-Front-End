<template>
    <Tab>
        <Crawler></Crawler>
        <Sql></Sql>
        <Xss></Xss>
        <Ssh></Ssh>
        <Intruder></Intruder>
    </Tab>
</template>

<script>
import Tab from '../components/Tab'
import Intruder from '../components/Attack-Intruder'
import Sql from '../components/Attack-Sql'
import Xss from '../components/Attack-Xss'
import Crawler from '../components/Attack-Crawler'
import Ssh from '../components/Attack-Ssh'
export default {
    components: {
        Tab,
        Intruder,
        Sql,
        Xss,
        Crawler,
        Ssh
    },
    created () {
        this.$emit("menu", "attack");
    }
}
</script>

<style scoped>

</style>