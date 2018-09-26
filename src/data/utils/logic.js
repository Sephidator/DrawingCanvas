import store from './store';

const logic = {
  recognize (figure) {
    let lineNum = figure.lineNum;
    let recognition = {
      color: store.getters.getDefaultColor,
      tag: store.getters.getDefaultName
    };

    if (lineNum === 1) {
      recognition.color = store.getters.getCircleColor;
      recognition.tag = store.getters.getCircleName;
    } else if (lineNum === 3) {
      recognition.color = store.getters.getTriangleColor;
      recognition.tag = store.getters.getTriangleName;
    } else if (lineNum === 4) {
      recognition.color = store.getters.getRectangleColor;
      recognition.tag = store.getters.getRectangleName;
    } else if (lineNum === 5) {
      recognition.color = store.getters.getPentagonColor;
      recognition.tag = store.getters.getPentagonName;
    } else if (lineNum === 6) {
      recognition.color = store.getters.getHexagonColor;
      recognition.tag = store.getters.getHexagonName;
    }

    return recognition;
  },

  isValidJSON (json) {
    if (!(json instanceof Array)) {
      return false;
    } else if (json.length === 0) {
      return true;
    }

    let figure = json[0];
    if (figure.tag === undefined || figure.lines === undefined) {
      return false;
    } else if (!(figure.lines instanceof Array)) {
      return false;
    } else if (figure.lines.length === 0) {
      return true;
    }

    let line = figure.lines[0];
    if (line.color === undefined || line.points === undefined) {
      return false;
    } else if (!(line.points instanceof Array)) {
      return false;
    } else if (line.points.length === 0) {
      return true;
    }

    let point = line.points[0];
    return (point.percentX !== undefined && point.percentY !== undefined);
  }
};

export default logic;
