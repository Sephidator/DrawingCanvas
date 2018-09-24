<template>
  <div class='canvas-container'>
    <div class='paint-area'>
      <canvas id='canvas'></canvas>
    </div>
  </div>
</template>

<script>
import logic from '../data/global/logic';
import Figure from '../data/dataframe/Figure';
import Line from '../data/dataframe/Line';
import Canvas from '../data/dataframe/Canvas';

export default {
  name: 'canvas-pane',

  data () {
    return {
      color: 'hsla(0,100,50,1)',
      ratio: 9 / 16,
      isDrawing: false,
      drawingEnabled: false,
      canvas: null,
      canvasContext: null,
      paintingData: null,
      figure: null,
      line: null
    };
  },

  mounted () {
    this.$bus.$on('setColor', (color) => {
      this.color = color;
    });
    this.$bus.$on('enableDraw', () => {
      this.enableDraw();
    });
    this.$bus.$on('recognizeFigure', () => {
      this.recognizeFigure();
    });
    this.$bus.$on('undoOneLine', () => {
      this.figure.removeOneLine();
      this.repaint();
    });
    this.$bus.$on('clearCanvas', () => {
      this.canvas.clear();
      this.clearSavedData();
    });

    this.$bus.$on('readFile', (json) => {
      this.clearSavedData();
      json.forEach((figureJSON) => {
        this.paintingData.push(new Figure(figureJSON));
      });
      this.repaint();
    });
    this.$bus.$on('saveFile', (callback) => {
      const data = [];
      this.paintingData.forEach((figure) => {
        data.push(figure.toJSON());
      });
      if (this.figure.lineNum !== 0) {
        data.push(this.figure.toJSON());
      }
      callback(JSON.stringify(data));
    });

    this.$nextTick(() => {
      this.canvas = new Canvas(document.getElementById('canvas'));
      this.canvas.setEvent('mousedown', this.startDrawing);
      this.canvas.setEvent('mouseup', this.endDrawing);
      this.canvas.setEvent('mouseout', this.endDrawing);
      this.canvas.setEvent('mousemove', this.moveBrush);

      this.clearSavedData();
      this.resetCanvas();
      window.addEventListener('resize', this.resetCanvas);
    });
  },

  methods: {
    clearSavedData () {
      this.paintingData = [];
      this.figure = new Figure();
      this.line = new Line();
      this.drawingEnabled = false;
      this.isDrawing = false;
    },

    startDrawing (mouseEvent) {
      if (this.drawingEnabled) {
        this.isDrawing = true;

        // 计算出鼠标点击在canvas中的位置
        const x = mouseEvent.offsetX;
        const y = mouseEvent.offsetY;
        this.canvas.newStroke();
        this.canvas.draw(x, y, this.color);

        // 存储画的线
        this.line = new Line();
        this.line.color = this.color;
        this.line.addPoint(x / this.canvas.width, y / this.canvas.height);
      }
    },

    endDrawing () {
      if (this.isDrawing) {
        this.figure.addLine(this.line.clone());
        this.isDrawing = false;
      }
    },

    moveBrush (mouseEvent) {
      if (this.isDrawing) {
        const x = mouseEvent.offsetX;
        const y = mouseEvent.offsetY;
        this.canvas.draw(x, y, this.color);
        this.line.addPoint(x / this.canvas.width, y / this.canvas.height);
      }
    },

    resetCanvas () {
      const canvasWidth = document.getElementById('canvas').offsetWidth;
      this.canvas.setSize(canvasWidth, canvasWidth * this.ratio);
      this.repaint();
    },

    repaint () {
      this.canvas.clear();
      this.paintingData.forEach((figure) => {
        figure.draw(this.canvas);
      });
      this.figure.draw(this.canvas);
    },

    enableDraw () {
      if (this.drawingEnabled === false) {
        this.drawingEnabled = true;
      } else if (this.figure.lineNum !== 0) {
        this.$message({
          message: '请先对已绘画的图形进行标记！',
          type: 'warning'
        });
      }
    },

    recognizeFigure () {
      if (this.drawingEnabled && this.figure.lineNum > 0) {
        const recognition = logic.recognize(this.figure);
        this.figure.color = recognition.color;
        this.figure.tag = recognition.tag;
        this.repaint();

        this.$message({
          message: '识别结果：' + this.figure.tag,
          type: 'success'
        });

        const oneFigure = this.figure.clone();
        this.paintingData.push(oneFigure);

        this.figure = new Figure();
        this.line = new Line();
        this.drawingEnabled = false;
      } else {
        this.$message({
          message: '未进行绘制！请开始绘制！',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style scoped>
.canvas-container {
  background-color: #CBCBCB;
  width: 100%;
  height: 100%;
  display: flex;
}

.paint-area{
  margin: 0 20px;
  width: 100%;
  height: 100%;
  display: flex;
}

#canvas {
  width: 100%;
  background-color: white;
  margin: auto 0;
}
</style>
