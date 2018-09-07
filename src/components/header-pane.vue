<template>
    <div class="header">
        <img src="../assets/logo.png" class="logo"/>
        <div class="title">绘画板</div>
        <div class="load-button-container">
            <el-button class="load-button" circle><i class="el-icon-edit-outline load-icon"></i></el-button>
            <el-button class="load-button" circle><i class="el-icon-download load-icon"></i></el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "function-pane"
    }
</script>

<style scoped>
    .header {
        height: 80px;
        background-color: #43B0FE;
        display: flex;
    }

    .logo {
        margin: 10px 20px;
        float: left;
        width: 80px;
        height: 60px;
        background-image: url(../assets/logo.png);
    }

    .title {
        font-size: 40px;
        color: white;
        margin: auto auto auto 20px;
    }

    .load-button-container {
        margin-right: 0;
    }

    .load-button {
        height: 50px;
        width: 50px;
        margin: 15px;
        font-size: 25px;
    }
</style>
