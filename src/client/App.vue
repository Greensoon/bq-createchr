<template>
    <div class="bq-ctx-wrap" :style="`background-image: url(${bgUrl})`">
        <search></search>
    </div>
</template>
<script>
import Search from './Search'
export default {
    components: {
        Search
    },
    data() {
        return {
            bgUrl: 'https://source.unsplash.com/random/1920x1080'
        }
    }
}
</script>
<style lang="less" scoped>
.bq-ctx-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
}
</style>

