<template>
  <el-container class='whole-page'>
    <el-header>
      <header-pane></header-pane>
    </el-header>
    <el-container>
      <el-aside>
        <aside-pane></aside-pane>
      </el-aside>
      <el-main>
        <canvas-pane></canvas-pane>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderPane from './components/header-pane';
import AsidePane from './components/aside-pane';
import CanvasPane from './components/canvas-pane';

export default {
  name: 'App',
  components: {CanvasPane, AsidePane, HeaderPane}
};
</script>

<style>
/* overwrite CSS of element-ui */
.el-header {
  height: 80px !important;
  padding: 0 !important;
}

.el-aside {
  width: 240px !important;
}

.el-main {
  padding: 0!important;
}

.whole-page {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
