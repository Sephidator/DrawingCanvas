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
                },
                painting: [
                    this.figure
                ],
                figure: {
                    tag: "",
                    lines: [
                        this.line
                    ]
                },
                line: {
                    color: "",
                    lineWidth: "",
                    points: [
                        {
                            percentX: 0,
                            percentY: 0
                        }
                    ]
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

                this.clearSavedData();
                this.resetCanvas();
                window.addEventListener('resize', this.resetCanvas);
            })
        },
        methods: {
            clearSavedData() {
                // JS可以用长度赋值为0的方式清空数组
                this.painting = [];
                this.figure.lines = [];
                this.line.points = [];
            },

            startDrawing(mouseEvent) {
                this.isDrawing = true;

                //计算出鼠标点击在canvas中的位置
                let x = mouseEvent.offsetX;
                let y = mouseEvent.offsetY;
                this.oldPoint = {
                    x: x,
                    y: y
                };
                this.draw(x, y, 2, "black");

                // 存储画过的线
                this.line.color = "black";
                this.line.lineWidth = 2;
                this.line.points.length = 0;
                this.line.points.push(
                    {
                        percentX: x / this.canvas.width,
                        percentY: y / this.canvas.height
                    }
                )
            },

            endDrawing() {
                if(this.isDrawing) {
                    // 深拷贝，避免因为引用传递覆盖之前保存的旧的line
                    let oneLine = JSON.parse(JSON.stringify(this.line));
                    this.figure.lines.push(oneLine);
                    this.isDrawing = false;
                }
            },

            moveBrush(mouseEvent) {
                if(this.isDrawing) {
                    let x = mouseEvent.offsetX;
                    let y = mouseEvent.offsetY;
                    this.draw(x, y, 2, "black");
                    this.oldPoint = {
                        x : x,
                        y : y
                    };

                    this.line.points.push(
                        {
                            percentX: x / this.canvas.width,
                            percentY: y / this.canvas.height
                        }
                    )
                }
            },

            draw(x, y, lineWidth, color) {
                this.canvasContext.beginPath();

                //线的宽度和样式等信息
                this.canvasContext.lineWidth = lineWidth;
                this.canvasContext.lineCap = "round";
                this.canvasContext.strokeStyle = color;

                this.canvasContext.moveTo(x, y);
                this.canvasContext.lineTo(this.oldPoint.x, this.oldPoint.y);
                this.canvasContext.stroke();

                this.canvasContext.closePath();
            },

            resetCanvas() {
                let canvasWidth = document.getElementById("canvas").offsetWidth;
                this.canvas.width = canvasWidth;
                this.canvas.height = canvasWidth * this.ratio;

                this.repaint();
            },

            repaint() {
                this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

                this.painting.forEach((figure) => {
                    this.drawOneFigure(figure);
                });
                this.drawOneFigure(this.figure);
            },

            drawOneFigure(figure) {
                figure.lines.forEach((line) => {
                    let lineWidth = line.lineWidth;
                    let color = line.color;

                    line.points.forEach((point, index) => {
                        let x = point.percentX * this.canvas.width;
                        let y = point.percentY * this.canvas.height;

                        if(index === 0) {
                            this.oldPoint = {
                                x: x,
                                y: y
                            }
                        }

                        this.draw(x, y, lineWidth, color);
                        this.oldPoint = {
                            x: x,
                            y: y
                        }
                    });

                });
            },
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
