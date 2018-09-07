<template>
  <el-container>
    <el-header>
      <function-pane></function-pane>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import functionPane from './components/functionPane'

export default {
  name: 'App',
  components: {functionPane}
}
</script>

<style>
    .el-header {
        height: 100px !important;
        padding: 0 !important;
    }
</style>
