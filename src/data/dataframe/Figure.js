import * as rasterizeHTML from 'rasterizehtml';
import Line from './Line';

export default class Figure {
  tag = '';
  lines = [];

  constructor (json) {
    if (json !== undefined) {
      this.tag = json.tag;
      json.lines.forEach((lineJSON) => {
        this.lines.push(new Line(lineJSON));
      });
    }
  }

  set color (color) {
    this.lines.forEach((line) => {
      line.color = color;
    });
  }

  get lineNum () {
    return this.lines.length;
  }

  addLine (line) {
    this.lines.push(line);
  }

  removeOneLine () {
    this.lines.pop();
  }

  draw (canvas) {
    this.lines.forEach((line) => {
      line.draw(canvas);
    });
    if (this.tag !== '') {
      const coord = canvas.lastCoordinate;
      const cssString = 'position:absolute; white-space: nowrap;' + 'top:' +
        coord.y + 'px;' + 'left:' + coord.x + 'px;';
      rasterizeHTML.drawHTML(`<span style="${cssString}">${this.tag}</span>`, canvas.element);
    }
  }

  clone () {
    const clone = new Figure();
    clone.tag = this.tag;
    clone.lines = this.lines;
    return clone;
  }

  toJSON () {
    const json = {
      tag: this.tag,
      lines: []
    };
    this.lines.forEach((line) => {
      json.lines.push(line.toJSON());
    });
    return json;
  }
}
