<template>
    <div class="canvas-container">
        <div class="paint-area">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<script>
    import * as rasterizeHTML from "rasterizehtml";

    export default {
        name: "canvas-pane",
        data() {
            return {
                color: "hsla(0,100,50,1)",
                ratio: 9/16,
                lineWidth: 2,
                canvas: null,
                canvasContext: null,
                isDrawing: false,
                drawingEnabled: false,
                oldPoint: {
                    x: 0,
                    y: 0
                },
                paintingData: [
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
            this.$bus.$on("setColor", (color) => {
                this.color = color;
            });
            this.$bus.$on("enableDraw", () => {
                if(this.drawingEnabled === false) {
                    this.drawingEnabled = true;
                }
                else {
                    this.$message({
                        message: "请先对已绘画的图形进行标记！",
                        type: 'warning'
                    });
                }
            });
            this.$bus.$on("recognizeFigure", () => {
                if(this.drawingEnabled && this.figure.lines.length > 0) {
                    if(this.figure.lines.length === 1) {
                        this.setFigureColorAndTag(this.figure,
                            this.$store.getters.getCircleColor, this.$store.getters.getCircleName);
                    }
                    else if(this.figure.lines.length === 3) {
                        this.setFigureColorAndTag(this.figure,
                            this.$store.getters.getTriangleColor, this.$store.getters.getTriangleName);
                    }
                    else if(this.figure.lines.length === 4) {
                        this.setFigureColorAndTag(this.figure,
                            this.$store.getters.getRectangleColor, this.$store.getters.getRectangleName);
                    }
                    else if(this.figure.lines.length === 5) {
                        this.setFigureColorAndTag(this.figure,
                            this.$store.getters.getPentagonColor, this.$store.getters.getPentagonName);
                    }
                    else if(this.figure.lines.length === 6) {
                        this.setFigureColorAndTag(this.figure,
                            this.$store.getters.getHexagonColor, this.$store.getters.getHexagonName);
                    }
                    else {
                        this.setFigureColorAndTag(this.figure,
                            this.$store.getters.getDefaultColor, this.$store.getters.getDefaultName);
                    }

                    this.$message({
                        message: "识别结果：" + this.figure.tag,
                        type: 'success'
                    });

                    let oneFigure = JSON.parse(JSON.stringify(this.figure));
                    this.paintingData.push(oneFigure);

                    this.figure.tag = "";
                    this.figure.lines = [];
                    this.line.color = "";
                    this.line.points = [];
                    this.drawingEnabled = false;
                }
                else {
                    this.$message({
                        message: "未进行绘制！请开始绘制！",
                        type: 'warning'
                    });
                }
            });
            this.$bus.$on("undoOneLine", () => {
                this.figure.lines.pop();
                this.figure.tag = "";
                this.repaint();
            });
            this.$bus.$on("clearCanvas", () => {
                this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.clearSavedData();
            });
            this.$bus.$on("readFile", (paintingData) => {
                this.clearSavedData();
                this.paintingData = paintingData;
                this.repaint();
            });
            this.$bus.$on("saveFile", (callback) => {
                let paintingData = JSON.parse(JSON.stringify(this.paintingData));
                let lastFigure = JSON.parse(JSON.stringify(this.figure));
                paintingData.push(lastFigure);
                callback(JSON.stringify(paintingData));
            });
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
                this.paintingData = [];
                this.figure.tag = "";
                this.figure.lines = [];
                this.line.color = "";
                this.line.points = [];
                this.drawingEnabled = false;
                this.isDrawing = false;
            },

            startDrawing(mouseEvent) {
                if(this.drawingEnabled) {
                    this.isDrawing = true;

                    //计算出鼠标点击在canvas中的位置
                    let x = mouseEvent.offsetX;
                    let y = mouseEvent.offsetY;
                    this.oldPoint = {
                        x: x,
                        y: y
                    };
                    this.draw(x, y, this.color);

                    // 存储画过的线
                    this.line.color = this.color;
                    this.line.points.length = 0;
                    this.line.points.push(
                        {
                            percentX: x / this.canvas.width,
                            percentY: y / this.canvas.height
                        }
                    );
                }
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
                    this.draw(x, y, this.color);
                    this.oldPoint = {
                        x : x,
                        y : y
                    };

                    this.line.points.push(
                        {
                            percentX: x / this.canvas.width,
                            percentY: y / this.canvas.height
                        }
                    );
                }
            },

            draw(x, y, color) {
                this.canvasContext.beginPath();

                //线的宽度和样式等信息
                this.canvasContext.lineWidth = this.lineWidth;
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

                this.paintingData.forEach((figure) => {
                    this.drawOneFigure(figure);
                });
                this.drawOneFigure(this.figure);
            },

            drawOneFigure(figure) {
                figure.lines.forEach((line) => {
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

                        this.draw(x, y, color);
                        this.oldPoint = {
                            x: x,
                            y: y
                        }
                    });
                });
                if(figure.tag !== "") {
                    let cssString = "position:absolute; white-space: nowrap;" + "top:" +
                        this.oldPoint.y + "px;" + "left:" + this.oldPoint.x + "px;";
                    rasterizeHTML.drawHTML('<span style="' + cssString + '">' + figure.tag + "</span>",
                        this.canvas);
                }
            },

            setFigureColorAndTag(figure, color, tag) {
                figure.tag = tag;
                figure.lines.forEach((line) => {
                    line.color = color;
                });
                this.repaint();
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
