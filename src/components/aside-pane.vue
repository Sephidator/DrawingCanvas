<template>
    <div class="aside">
        <div class="color-board">
            <color-picker v-model="color" @select="onColorSelect" class="radial-color-picker"></color-picker>
            <el-form label-position="left" label-width="60px" style="margin: 10px">
                <el-form-item label="饱和度" style="margin: 0">
                    <el-slider v-model="color.saturation"></el-slider>
                </el-form-item>
                <el-form-item label="亮度" style="margin: 0">
                    <el-slider v-model="color.luminosity"></el-slider>
                </el-form-item>
            </el-form>
        </div>

        <el-form class="button-list">
            <el-form-item>
                <el-button type="primary">开始绘画</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success">标记图案</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="warning">撤销一笔</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger">清空画布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ColorPicker from '@radial-color-picker/vue-color-picker';

    export default {
        name: "color-board",
        components: { ColorPicker },
        data() {
            return {
                color: {
                    hue: 50,
                    saturation: 100,
                    luminosity: 50,
                    alpha: 1
                }
            }
        },
        methods: {
            onColorSelect() {
                console.log(this.color);
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
        font-size: 16px;
    }
</style>

