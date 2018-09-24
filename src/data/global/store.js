import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
/*
  use this.$store instead of import store.js
  use this.$store.dispatch('actionName') to set state.xxx
  use this.$store.getters.getXxxx instead of this.$store.state.xxxx
  WARNING: DON'T ADD () AFTER this.$store.getters.getXxxx
*/
let store = new Vuex.Store({
  state: {
    shape: {
      circleName: '圆形',
      triangleName: '三角形',
      rectangleName: '长方形',
      pentagonName: '五边形',
      hexagonName: '六边形',
      defaultName: '其他'
    },
    style: {
      circleColor: '#FFB50B',
      triangleColor: '#FC0006',
      rectangleColor: '#0E00FF',
      pentagonColor: '#139614',
      hexagonColor: '#9600FF',
      defaultColor: '#280091',
      lineWidth: 2
    }
  },
  getters: {
    getCircleName (state) {
      return state.shape.circleName;
    },
    getTriangleName (state) {
      return state.shape.triangleName;
    },
    getRectangleName (state) {
      return state.shape.rectangleName;
    },
    getPentagonName (state) {
      return state.shape.pentagonName;
    },
    getHexagonName (state) {
      return state.shape.hexagonName;
    },
    getDefaultName (state) {
      return state.shape.defaultName;
    },

    getCircleColor (state) {
      return state.style.circleColor;
    },
    getTriangleColor (state) {
      return state.style.triangleColor;
    },
    getRectangleColor (state) {
      return state.style.rectangleColor;
    },
    getPentagonColor (state) {
      return state.style.pentagonColor;
    },
    getHexagonColor (state) {
      return state.style.hexagonColor;
    },
    getDefaultColor (state) {
      return state.style.defaultColor;
    },
    getLineWidth (state) {
      return state.style.lineWidth;
    }
  }
});

Vue.prototype.$store = store;

export default store;
