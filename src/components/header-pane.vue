<template>
  <div class='header'>
    <img src='../assets/logo.png' class='logo'/>
    <div class='title'>绘画板</div>
    <div class='load-button-container'>
      <label class='load-button' style='display: flex'>
        <i class='el-icon-edit-outline'></i>
        <input type='file' @change='readFile' />
      </label>
      <el-button class='load-button' icon='el-icon-download'
             @click='dialogFormVisible = true'></el-button>

      <el-dialog title='保存文件' :visible.sync='dialogFormVisible' width='500px'>
        <el-form label-position='left' label-width='80px'>
          <el-form-item label='文件名：'>
            <el-input style='width: 300px;' placeholder='请输入内容' v-model='fileName'>
              <template slot='append'>. JSON</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          <el-button @click='dialogFormVisible=false' round>取 消</el-button>
          <el-button type='primary' @click='saveFile' round>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'function-pane',
  data () {
    return {
      dialogFormVisible: false,
      fileName: ''
    };
  },
  methods: {
    readFile (e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        let paintingData = JSON.parse(e.target.result);
        this.$bus.$emit('readFile', paintingData);
      };
      reader.readAsText(file);
    },
    saveFile () {
      if (this.fileName === '') {
        this.$message({
          message: '输入的文件名不能为空！',
          type: 'warning'
        });
      } else {
        this.dialogFormVisible = false;

        let dataToSave = '';
        this.$bus.$emit('saveFile', (paintingData) => {
          dataToSave = paintingData;
        });

        let FileSaver = require('file-saver');
        let file = new File([dataToSave], this.fileName + '.json', {type: 'text/plain;charset=utf-8'});
        FileSaver.saveAs(file);

        this.$message({
          message: '文件保存成功！',
          type: 'success'
        });
      }
    }
  }
};
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
  display: flex;
}

.load-button {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: auto 30px auto 0;
  background-color: white;
  text-align: center;
  padding: 0;
  border: 0;
  font-size: 30px;
  color: black;
}

i {
  margin: auto;
}

.load-button:hover {
  opacity: 1;
  color: #43B0FE;
}

input {
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
  opacity: 0;
}

.dialog-footer .el-button {
  width: 100px;
  height: 50px;
}
</style>
