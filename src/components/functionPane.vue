<template>
    <div class="header">
        <img src="../assets/logo.png" class="logo"/>
        <div class="load-button-container">
            <el-button class="load-button" circle><i class="el-icon-edit-outline load-icon"></i></el-button>
            <el-button class="load-button" circle><i class="el-icon-download load-icon"></i></el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "functionPane"
    }
</script>

<style scoped>
    .header {
        height: 100px;
        position: relative;
        background-color: #EEEEEE;
    }

    .logo {
        margin: 10px 20px;
        width: 100px;
        height: 80px;
        background-image: url(../assets/logo.png);
    }

    .load-button-container {
        float: right;
    }

    .load-button {
        height: 60px;
        width: 60px;
        margin: 20px;
        font-size: 30px;
    }
</style>
