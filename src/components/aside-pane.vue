<template>
  <div class='aside'>
    <div class='color-board'>
      <color-picker v-model='color' @input='setColor' class='radial-color-picker'></color-picker>
      <el-form label-position='left' label-width='60px' style='margin: 10px'>
        <el-form-item label='饱和度' style='margin: 0'>
          <el-slider v-model='color.saturation' @change='setColor'></el-slider>
        </el-form-item>
        <el-form-item label='亮度' style='margin: 0'>
          <el-slider v-model='color.luminosity' @change='setColor'></el-slider>
        </el-form-item>
      </el-form>
    </div>

    <el-form class='button-list'>
      <el-form-item>
        <el-button type='primary' @click = 'enableDraw'>开始绘画</el-button>
      </el-form-item>
      <el-form-item>
        <el-popover placement='right' trigger='hover'>
          <div class='recognition-info'>
            <el-form label-width='80px' labelPosition='left'>
              <el-form-item :label=this.$store.getters.getTriangleName>
                <div class='littleCircle' v-bind:style='{ backgroundColor: this.$store.getters.getTriangleColor}'></div>
              </el-form-item>
              <el-form-item :label=this.$store.getters.getRectangleName>
                <div class='littleCircle' v-bind:style='{ backgroundColor: this.$store.getters.getRectangleColor}'></div>
              </el-form-item>
              <el-form-item :label=this.$store.getters.getPentagonName>
                <div class='littleCircle' v-bind:style='{ backgroundColor: this.$store.getters.getPentagonColor}'></div>
              </el-form-item>
              <el-form-item :label=this.$store.getters.getHexagonName>
                <div class='littleCircle' v-bind:style='{ backgroundColor: this.$store.getters.getHexagonColor}'></div>
              </el-form-item>
              <el-form-item :label=this.$store.getters.getCircleName>
                <div class='littleCircle' v-bind:style='{ backgroundColor: this.$store.getters.getCircleColor}'></div>
              </el-form-item>
              <el-form-item :label=this.$store.getters.getDefaultName>
                <div class='littleCircle' v-bind:style='{ backgroundColor: this.$store.getters.getDefaultColor}'></div>
              </el-form-item>
            </el-form>
          </div>
          <el-button slot='reference' type='success' @click = 'recognizeFigure'>图形识别</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type='warning' @click = 'undoOneLine'>撤销一笔</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type='danger' @click = 'clearCanvas'>清空画布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker';

export default {
  name: 'color-board',
  components: { ColorPicker },
  data () {
    return {
      color: {
        hue: 0,
        saturation: 100,
        luminosity: 50,
        alpha: 1
      }
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.setColor();
    });
  },
  methods: {
    setColor () {
      let h = this.color.hue;
      let s = this.color.saturation;
      let l = this.color.luminosity;
      let a = this.color.alpha;
      let color = 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
      this.$bus.emit('setColor', color);
    },
    enableDraw () {
      this.$bus.$emit('enableDraw');
    },
    recognizeFigure () {
      this.$bus.$emit('recognizeFigure');
    },
    undoOneLine () {
      this.$bus.$emit('undoOneLine');
    },
    clearCanvas () {
      this.$bus.$emit('clearCanvas');
    }
  }
};
</script>

<style>
@import '../../node_modules/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

.aside {
  height: 100%;
  width: 240px;
  background-color: #F8F8F8;
}

.color-board {
  text-align: center;
  padding: 20px;
}

.radial-color-picker {
  width: 200px;
  height: 200px;
}

.button-list {
  margin: 100px 20px 0 20px;
}

.button-list .el-form-item {
  margin-top: 10px;
}

/* overwrite CSS of element-ui */
.el-button {
  width: 200px;
  height: 60px;
  font-size: 16px!important;
}

.recognition-info .el-form-item {
  height: 30px;
  margin: 0 25px;
}

.el-form-item__label {
  font-size: 16px!important;
  font-weight: bold;
  height: 30px;
}

.littleCircle {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  margin: 10px 0 0 0;
}
</style>
