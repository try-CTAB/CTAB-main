<template>
    <div>this is a plain html representation of a CTAB (minimal JS), that can be used for embedding or copy pasting <br> table:{{contributionTable}}</div>

</template>

<script>
    export default {
        name: "plainCTAB",
        props: {
            contributionTable: {type:Object, default: () => {}},
        },
    }
</script>

<style scoped>

</style>
