<template>
    <div class="canvas-container">
        <div class="paint-area">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<script>
    export default {
        name: "canvas-pane"
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
        height:0;
        padding-bottom: 56.25%;
        margin: auto 0;
    }
</style>
