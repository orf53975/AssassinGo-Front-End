<template>
    <Tab>
        <ReconBase></ReconBase>
        <ReconTraceRoute></ReconTraceRoute>
        <ReconSiteMap></ReconSiteMap>
        <ReconDirb></ReconDirb>
        <ReconSubdomain></ReconSubdomain>
    </Tab>
</template>

<script>
import Tab from '../components/Tab'
import ReconBase from '../components/Recon-Base'
import ReconTraceRoute from '../components/Recon-TraceRoute'
import ReconSiteMap from '../components/Recon-SiteMap'
import ReconDirb from '../components/Recon-DirB'
import ReconSubdomain from '../components/Recon-Subdomain'
export default {
    components: {
        Tab,
        ReconBase,
        ReconTraceRoute,
        ReconSiteMap,
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