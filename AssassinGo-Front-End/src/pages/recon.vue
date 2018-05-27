<template>
    <Tab>
        <ReconBase></ReconBase>
        <ReconTraceRoute></ReconTraceRoute>
        <ReconSideMapper></ReconSideMapper>
        <ReconDirb></ReconDirb>
        <ReconSubdomain></ReconSubdomain>
    </Tab>
</template>

<script>
import Tab from '../components/Tab'
import ReconBase from '../components/Recon-Base'
import ReconTraceRoute from '../components/Recon-TraceRoute'
import ReconSideMapper from '../components/Recon-SideMapper'
import ReconDirb from '../components/Recon-DirB'
import ReconSubdomain from '../components/Recon-Subdomain'
export default {
    components: {
        Tab,
        ReconBase,
        ReconTraceRoute,
        ReconSideMapper,
        ReconDirb,
        ReconSubdomain,
    },
    created () {
        this.$emit("menu", "recon");
    }
}
</script>

<style scoped>

</style>