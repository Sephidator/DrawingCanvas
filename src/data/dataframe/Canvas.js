import store from '../utils/store';

export default class Canvas {
  element = null;
  context = null;
  lastCoordinate = {x: 0, y: 0}; // 记录画布上最后一个点的坐标，和Point(percentX, percentY)同，是具体数值
  haveDrawn = false; // 判断每一笔有没有开始画

  constructor (element) {
    this.element = element;
    this.context = element.getContext('2d');
  }

  get width () {
    return this.element.width;
  }

  get height () {
    return this.element.height;
  }

  setSize (width, height) {
    this.element.width = width;
    this.element.height = height;
  }

  setEvent (eventName, func) {
    this.element.addEventListener(eventName, func);
  }

  // 设置画布状态为重新开始画
  newStroke () {
    this.haveDrawn = false;
  }

  clear () {
    let width = this.element.width;
    let height = this.element.height;
    this.context.clearRect(0, 0, width, height);
  }

  draw (x, y, color) {
    if (!this.haveDrawn) {
      this.lastCoordinate = {x: x, y: y};
      this.haveDrawn = true;
    }

    this.context.beginPath();
    this.context.lineWidth = store.getters.getLineWidth;
    this.context.lineCap = 'round';
    this.context.strokeStyle = color;
    this.context.moveTo(x, y);
    this.context.lineTo(this.lastCoordinate.x, this.lastCoordinate.y);
    this.context.stroke();
    this.context.closePath();

    this.lastCoordinate = {x: x, y: y};
  }
}
