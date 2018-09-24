export default class Line {
  color = '';
  points = [];

  constructor (json) {
    if (json !== undefined) {
      this.color = json.color;
      this.points = json.points;
    }
  }

  addPoint (percentX, percentY) {
    let point = {
      percentX: percentX,
      percentY: percentY
    };
    this.points.push(point);
  }

  draw (canvas) {
    this.points.forEach((point, index) => {
      let x = point.percentX * canvas.width;
      let y = point.percentY * canvas.height;

      if (index === 0) {
        canvas.newStroke();
      }
      canvas.draw(x, y, this.color);
    });
  }

  clone () {
    const clone = new Line();
    clone.color = this.color;
    clone.points = this.points;
    return clone;
  }

  toJSON () {
    return {
      color: this.color,
      points: this.points
    };
  }
}
