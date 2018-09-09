import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
/*
    use this.$store instead of import store.js
    use this.$store.dispatch('actionName') to set state.xxx
    use this.$store.getters.getXxxx instead of this.$store.state.xxxx
    WARNING: DON'T ADD () AFTER this.$store.getters.getXxxx
*/
let store = new Vuex.Store({
    state: {
        circleName: "圆形",
        triangleName: "三角形",
        rectangleName: "长方形",
        pentagonName: "五边形",
        hexagonName: "六边形",
        defaultName: "其他",
        circleColor: "#FFB50B",
        triangleColor: "#FC0006",
        rectangleColor: "#0E00FF",
        pentagonColor: "#139614",
        hexagonColor: "#9600FF",
        defaultColor: "#280091"
    },
    getters: {
        getCircleName(state) {
            return state.circleName;
        },
        getTriangleName(state) {
            return state.triangleName;
        },
        getRectangleName(state) {
            return state.rectangleName;
        },
        getPentagonName(state) {
            return state.pentagonName;
        },
        getHexagonName(state) {
            return state.hexagonName;
        },
        getDefaultName(state) {
            return state.defaultName;
        },

        getCircleColor(state) {
            return state.circleColor;
        },
        getTriangleColor(state) {
            return state.triangleColor;
        },
        getRectangleColor(state) {
            return state.rectangleColor;
        },
        getPentagonColor(state) {
            return state.pentagonColor;
        },
        getHexagonColor(state) {
            return state.hexagonColor;
        },
        getDefaultColor(state) {
            return state.defaultColor;
        }
    }
});

Vue.prototype.$store = store;

export default store
