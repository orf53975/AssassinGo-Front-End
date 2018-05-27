<template>
    <Tab>
        <Poc></Poc>
    </Tab>
</template>

<script>
import Tab from '../components/Tab'
import Poc from '../components/Assassinate-Poc'
export default {
    components: {
        Tab,
        Poc,
    },
    created () {
        this.$emit("menu", "assassinate");
    }
}
</script>

<style scoped>

</style>