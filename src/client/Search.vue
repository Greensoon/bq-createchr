<template>
    <div class="search-wrap">
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
            <div slot="prepend">
                <img class="search-img" src="https://basic-static-server.infinitynewtab.com/search-logos/custom-google.png?imageView2/0/format/webp/q/48/v/1">
                <span class="el-icon-arrow-down"></span>
            </div>
        </el-input>
    </div>
</template>
<script>
export default {
    name: 'search',
    data() {
        return {
            keyword: '',
            select: 1
        }
    }
}
</script>
<style lang="less">
.search-wrap {
    width: 1000px;
    height: 650px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;

    .input-with-select {
        width: 680px;
        margin: 0 auto;
        height: 60px;
    }

    .el-input__inner {
        height: 100%;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
    }

    .el-input-group__append,
    .el-input-group__prepend {
        background: #fff;
        border-radius: 50px;
    }

    .el-input-group__append {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .el-input-group__prepend {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .el-input__icon {
        line-height: normal;
    }

    .search-img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }
}

</style>


