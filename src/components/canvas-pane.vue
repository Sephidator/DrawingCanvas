<template>
    <div class="canvas-container">
        <div class="paint-area">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<script>
    export default {
        name: "canvas-pane",
        data() {
            return {
                ratio: 9/16,
                canvas: null,
                canvasContext: null,
                isDrawing: false,
                oldPoint: {
                    x: 0,
                    y: 0
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.canvas = document.getElementById("canvas");

                this.canvasContext = this.canvas.getContext("2d");
                this.canvas.addEventListener("mousedown", this.startDrawing);
                this.canvas.addEventListener("mouseup", this.endDrawing);
                this.canvas.addEventListener("mouseout", this.endDrawing);
                this.canvas.addEventListener("mousemove", this.moveBrush);

                this.setCanvasSize();
                window.addEventListener('resize', this.setCanvasSize);
            })
        },
        methods: {
            setCanvasSize() {
                let canvasWidth = document.getElementById("canvas").offsetWidth;
                this.canvas.width = canvasWidth;
                this.canvas.height = canvasWidth * this.ratio;
            },

            startDrawing(mouseEvent) {
                this.isDrawing = true;

                //计算出鼠标点击在canvas中的位置
                let x = mouseEvent.offsetX;
                let y = mouseEvent.offsetY;

                //记录旧的点
                this.oldPoint = { x: x, y: y };
                this.draw(x, y);
            },

            endDrawing() {
                this.isDrawing = false;
            },

            moveBrush(mouseEvent) {
                if(this.isDrawing) {
                    let x = mouseEvent.offsetX;
                    let y = mouseEvent.offsetY;

                    this.draw(x, y);
                    this.oldPoint = { x : x, y : y };
                }
            },

            draw(x, y) {
                this.canvasContext.beginPath();

                //线的宽度
                this.canvasContext.lineWidth = 2;

                //线的样式
                this.canvasContext.lineCap = "round";
                this.canvasContext.moveTo(x, y);
                this.canvasContext.lineTo(this.oldPoint.x, this.oldPoint.y);

                this.canvasContext.strokeStyle = "#000000";
                this.canvasContext.stroke();
                this.canvasContext.closePath();
            }
        }
    }
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
