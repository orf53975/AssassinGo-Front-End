<template>
    <Tab>
        <Intruder></Intruder>
        <SideMapper></SideMapper>
    </Tab>
</template>

<script>
import Tab from '../components/Tab'
import Intruder from '../components/Attack-intruder'
import SideMapper from '../components/Attack-sidemapper'
export default {
    components: {
        Tab,
        Intruder,
        SideMapper,
    }
}
</script>

<style scoped>

</style>