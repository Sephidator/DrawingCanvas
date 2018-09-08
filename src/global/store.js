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
        circleColor: "#F56C6C",
        triangleColor: "#E6A23C",
        rectangleColor: "#409EFF",
        pentagonColor: "#67C23A",
        hexagonColor: "#9C27B0",
        defaultColor: "#000000"
    },
    getters: {
        getCircleColor(state) {
            return state.circleColor;
        },
        getTriangle(state) {
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
