<template>
    <Tab>
        <Seek></Seek>
    </Tab>
</template>

<script>
import Tab from '../components/Tab'
import Seek from '../components/Seek'
export default {
    components: {
        Tab,
        Seek,
    },
    created () {
        this.$emit("menu", "seek");
    }
}
</script>

<style scoped>

</style>