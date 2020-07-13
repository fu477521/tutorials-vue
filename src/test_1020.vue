<template>

</template>

<script>
    export default {
        name: "test_1020"
    }
</script>

<style scoped>
.one{
    /*设置为flex弹性盒子，并且定义为高度不够自动折行模式，用于横向排列子元素*/
    display: flex;
    flex-wrap: wrap;
    /*弹性盒子内部的子元素都均匀排列成一横排，并且左右两边都留有一定空隙*/
    justify-content: space-around;
}
</style>
