webpackJsonp([1],{"6vnE":function(t,e){},"7Otq":function(t,e,n){t.exports=n.p+"static/img/logo.f929b49.png"},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),a=n("NYxO");i.default.use(a.a);var s=new a.a.Store({state:{shape:{circleName:"圆形",triangleName:"三角形",rectangleName:"长方形",pentagonName:"五边形",hexagonName:"六边形",defaultName:"其他"},style:{circleColor:"#FFB50B",triangleColor:"#FC0006",rectangleColor:"#0E00FF",pentagonColor:"#139614",hexagonColor:"#9600FF",defaultColor:"#280091",lineWidth:2}},getters:{getCircleName:function(t){return t.shape.circleName},getTriangleName:function(t){return t.shape.triangleName},getRectangleName:function(t){return t.shape.rectangleName},getPentagonName:function(t){return t.shape.pentagonName},getHexagonName:function(t){return t.shape.hexagonName},getDefaultName:function(t){return t.shape.defaultName},getCircleColor:function(t){return t.style.circleColor},getTriangleColor:function(t){return t.style.triangleColor},getRectangleColor:function(t){return t.style.rectangleColor},getPentagonColor:function(t){return t.style.pentagonColor},getHexagonColor:function(t){return t.style.hexagonColor},getDefaultColor:function(t){return t.style.defaultColor},getLineWidth:function(t){return t.style.lineWidth}}});i.default.prototype.$store=s;var o=s,r={recognize:function(t){var e=t.lineNum,n={color:o.getters.getDefaultColor,tag:o.getters.getDefaultName};return 1===e?(n.color=o.getters.getCircleColor,n.tag=o.getters.getCircleName):3===e?(n.color=o.getters.getTriangleColor,n.tag=o.getters.getTriangleName):4===e?(n.color=o.getters.getRectangleColor,n.tag=o.getters.getRectangleName):5===e?(n.color=o.getters.getPentagonColor,n.tag=o.getters.getPentagonName):6===e&&(n.color=o.getters.getHexagonColor,n.tag=o.getters.getHexagonName),n},isValidJSON:function(t){try{if(!(t instanceof Array))return!1;if(0===t.length)return!0;var e=t[0];if(void 0===e.tag||void 0===e.lines)return!1;if(!(e.lines instanceof Array))return!1;if(0===e.lines.length)return!0;var n=e.lines[0];if(void 0===n.color||void 0===n.points)return!1;if(!(n.points instanceof Array))return!1;if(0===n.points.length)return!0;var i=n.points[0];return void 0!==i.percentX&&void 0!==i.percentY}catch(t){return!1}}},l={name:"function-pane",data:function(){return{dialogFormVisible:!1,fileName:""}},methods:{readFile:function(t){var e=this,n=t.target.files[0],i=new FileReader;i.onload=function(t){try{var n=JSON.parse(t.target.result);if(!r.isValidJSON(n))throw new Error;e.$bus.$emit("readFile",n)}catch(t){e.$message({message:"所选文件的数据不正确！",type:"warning"})}},i.readAsText(n)},saveFile:function(){var t=this;""===this.fileName?this.$message({message:"输入的文件名不能为空！",type:"warning"}):(this.dialogFormVisible=!1,this.$bus.$emit("saveFile",function(e){var i=n("lDdF"),a=new File([e],t.fileName+".json",{type:"text/plain;charset=utf-8"});i.saveAs(a)}),this.$message({message:"文件保存成功！",type:"success"}))}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header"},[i("img",{staticClass:"logo",attrs:{src:n("7Otq")}}),t._v(" "),i("div",{staticClass:"title"},[t._v("绘画板")]),t._v(" "),i("div",{staticClass:"load-button-container"},[i("label",{staticClass:"load-button",staticStyle:{display:"flex"}},[i("i",{staticClass:"el-icon-edit-outline"}),t._v(" "),i("input",{attrs:{type:"file",accept:".json"},on:{change:t.readFile}})]),t._v(" "),i("el-button",{staticClass:"load-button",attrs:{icon:"el-icon-download"},on:{click:function(e){t.dialogFormVisible=!0}}}),t._v(" "),i("el-dialog",{attrs:{title:"保存文件",visible:t.dialogFormVisible,width:"500px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{attrs:{"label-position":"left","label-width":"80px"}},[i("el-form-item",{attrs:{label:"文件名："}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入内容"},model:{value:t.fileName,callback:function(e){t.fileName=e},expression:"fileName"}},[i("template",{slot:"append"},[t._v(". JSON")])],2)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{round:""},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",round:""},on:{click:t.saveFile}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var u=n("VU/8")(l,c,!1,function(t){n("lylk")},"data-v-73e8aaf6",null).exports,h=n("XaHv"),g={name:"color-board",components:{ColorPicker:n.n(h).a},data:function(){return{color:{hue:0,saturation:100,luminosity:50,alpha:1}}},mounted:function(){var t=this;this.$nextTick(function(){t.setColor()})},methods:{setColor:function(){var t="hsla("+this.color.hue+","+this.color.saturation+"%,"+this.color.luminosity+"%,"+this.color.alpha+")";this.$bus.emit("setColor",t)},enableDraw:function(){this.$bus.$emit("enableDraw")},recognizeFigure:function(){this.$bus.$emit("recognizeFigure")},undoOneLine:function(){this.$bus.$emit("undoOneLine")},clearCanvas:function(){this.$bus.$emit("clearCanvas")}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"aside"},[n("div",{staticClass:"color-board"},[n("color-picker",{staticClass:"radial-color-picker",on:{input:t.setColor},model:{value:t.color,callback:function(e){t.color=e},expression:"color"}}),t._v(" "),n("el-form",{staticStyle:{margin:"10px"},attrs:{"label-position":"left","label-width":"60px"}},[n("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"饱和度"}},[n("el-slider",{on:{change:t.setColor},model:{value:t.color.saturation,callback:function(e){t.$set(t.color,"saturation",e)},expression:"color.saturation"}})],1),t._v(" "),n("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"亮度"}},[n("el-slider",{on:{change:t.setColor},model:{value:t.color.luminosity,callback:function(e){t.$set(t.color,"luminosity",e)},expression:"color.luminosity"}})],1)],1)],1),t._v(" "),n("el-form",{staticClass:"button-list"},[n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.enableDraw}},[t._v("开始绘画")])],1),t._v(" "),n("el-form-item",[n("el-popover",{attrs:{placement:"right",trigger:"hover"}},[n("div",{staticClass:"recognition-info"},[n("el-form",{attrs:{"label-width":"80px",labelPosition:"left"}},[n("el-form-item",{attrs:{label:this.$store.getters.getTriangleName}},[n("div",{staticClass:"littleCircle",style:{backgroundColor:this.$store.getters.getTriangleColor}})]),t._v(" "),n("el-form-item",{attrs:{label:this.$store.getters.getRectangleName}},[n("div",{staticClass:"littleCircle",style:{backgroundColor:this.$store.getters.getRectangleColor}})]),t._v(" "),n("el-form-item",{attrs:{label:this.$store.getters.getPentagonName}},[n("div",{staticClass:"littleCircle",style:{backgroundColor:this.$store.getters.getPentagonColor}})]),t._v(" "),n("el-form-item",{attrs:{label:this.$store.getters.getHexagonName}},[n("div",{staticClass:"littleCircle",style:{backgroundColor:this.$store.getters.getHexagonColor}})]),t._v(" "),n("el-form-item",{attrs:{label:this.$store.getters.getCircleName}},[n("div",{staticClass:"littleCircle",style:{backgroundColor:this.$store.getters.getCircleColor}})]),t._v(" "),n("el-form-item",{attrs:{label:this.$store.getters.getDefaultName}},[n("div",{staticClass:"littleCircle",style:{backgroundColor:this.$store.getters.getDefaultColor}})])],1)],1),t._v(" "),n("el-button",{attrs:{slot:"reference",type:"success"},on:{click:t.recognizeFigure},slot:"reference"},[t._v("图形识别")])],1)],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"warning"},on:{click:t.undoOneLine}},[t._v("撤销一笔")])],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"danger"},on:{click:t.clearCanvas}},[t._v("清空画布")])],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(g,f,!1,function(t){n("6vnE")},null,null).exports,v=n("mvHQ"),m=n.n(v),p=n("Zrlr"),C=n.n(p),w=n("wxAW"),b=n.n(w),y=n("GPkW"),$=function(){function t(e){C()(this,t),this.color="",this.points=[],void 0!==e&&(this.color=e.color,this.points=e.points)}return b()(t,[{key:"addPoint",value:function(t,e){var n={percentX:t,percentY:e};this.points.push(n)}},{key:"draw",value:function(t){var e=this;this.points.forEach(function(n,i){var a=n.percentX*t.width,s=n.percentY*t.height;0===i&&t.newStroke(),t.draw(a,s,e.color)})}},{key:"clone",value:function(){var e=new t;return e.color=this.color,e.points=this.points,e}},{key:"toJSON",value:function(){return{color:this.color,points:this.points}}}]),t}(),N=function(){function t(e){var n=this;C()(this,t),this.tag="",this.lines=[],void 0!==e&&(this.tag=e.tag,e.lines.forEach(function(t){n.lines.push(new $(t))}))}return b()(t,[{key:"addLine",value:function(t){this.lines.push(t)}},{key:"removeOneLine",value:function(){this.lines.pop()}},{key:"draw",value:function(t){if(this.lines.forEach(function(e){e.draw(t)}),""!==this.tag){var e=t.lastCoordinate,n="position:absolute; white-space: nowrap;top:"+e.y+"px;left:"+e.x+"px;";y.drawHTML('<span style="'+n+'">'+this.tag+"</span>",t.element)}}},{key:"clone",value:function(){var e=new t;return e.tag=this.tag,e.lines=this.lines,e}},{key:"toJSON",value:function(){var t={tag:this.tag,lines:[]};return this.lines.forEach(function(e){t.lines.push(e.toJSON())}),t}},{key:"color",set:function(t){this.lines.forEach(function(e){e.color=t})}},{key:"lineNum",get:function(){return this.lines.length}}]),t}(),x=function(){function t(e){C()(this,t),this.element=null,this.context=null,this.lastCoordinate={x:0,y:0},this.haveDrawn=!1,this.element=e,this.context=e.getContext("2d")}return b()(t,[{key:"setSize",value:function(t,e){this.element.width=t,this.element.height=e}},{key:"setEvent",value:function(t,e){this.element.addEventListener(t,e)}},{key:"newStroke",value:function(){this.haveDrawn=!1}},{key:"clear",value:function(){var t=this.element.width,e=this.element.height;this.context.clearRect(0,0,t,e)}},{key:"draw",value:function(t,e,n){this.haveDrawn||(this.lastCoordinate={x:t,y:e},this.haveDrawn=!0),this.context.beginPath(),this.context.lineWidth=o.getters.getLineWidth,this.context.lineCap="round",this.context.strokeStyle=n,this.context.moveTo(t,e),this.context.lineTo(this.lastCoordinate.x,this.lastCoordinate.y),this.context.stroke(),this.context.closePath(),this.lastCoordinate={x:t,y:e}}},{key:"width",get:function(){return this.element.width}},{key:"height",get:function(){return this.element.height}}]),t}(),k={name:"canvas-pane",data:function(){return{color:"hsla(0,100,50,1)",ratio:9/16,isDrawing:!1,drawingEnabled:!1,canvas:null,canvasContext:null,paintingData:null,figure:null,line:null}},mounted:function(){var t=this;this.$bus.$on("setColor",function(e){t.color=e}),this.$bus.$on("enableDraw",function(){t.enableDraw()}),this.$bus.$on("recognizeFigure",function(){t.recognizeFigure()}),this.$bus.$on("undoOneLine",function(){t.figure.removeOneLine(),t.repaint()}),this.$bus.$on("clearCanvas",function(){t.canvas.clear(),t.clearSavedData()}),this.$bus.$on("readFile",function(e){t.clearSavedData(),e.forEach(function(e){t.paintingData.push(new N(e))}),t.repaint()}),this.$bus.$on("saveFile",function(e){var n=[];t.paintingData.forEach(function(t){n.push(t.toJSON())}),0!==t.figure.lineNum&&n.push(t.figure.toJSON()),e(m()(n))}),this.$nextTick(function(){t.canvas=new x(document.getElementById("canvas")),t.canvas.setEvent("mousedown",t.startDrawing),t.canvas.setEvent("mouseup",t.endDrawing),t.canvas.setEvent("mouseout",t.endDrawing),t.canvas.setEvent("mousemove",t.moveBrush),t.clearSavedData(),t.resetCanvas(),window.addEventListener("resize",t.resetCanvas)})},methods:{clearSavedData:function(){this.paintingData=[],this.figure=new N,this.line=new $,this.drawingEnabled=!1,this.isDrawing=!1},startDrawing:function(t){if(this.drawingEnabled){this.isDrawing=!0;var e=t.offsetX,n=t.offsetY;this.canvas.newStroke(),this.canvas.draw(e,n,this.color),this.line=new $,this.line.color=this.color,this.line.addPoint(e/this.canvas.width,n/this.canvas.height)}},endDrawing:function(){this.isDrawing&&(this.figure.addLine(this.line.clone()),this.isDrawing=!1)},moveBrush:function(t){if(this.isDrawing){var e=t.offsetX,n=t.offsetY;this.canvas.draw(e,n,this.color),this.line.addPoint(e/this.canvas.width,n/this.canvas.height)}},resetCanvas:function(){var t=document.getElementById("canvas").offsetWidth;this.canvas.setSize(t,t*this.ratio),this.repaint()},repaint:function(){var t=this;this.canvas.clear(),this.paintingData.forEach(function(e){e.draw(t.canvas)}),this.figure.draw(this.canvas)},enableDraw:function(){!1===this.drawingEnabled?this.drawingEnabled=!0:0!==this.figure.lineNum&&this.$message({message:"请先对已绘画的图形进行标记！",type:"warning"})},recognizeFigure:function(){if(this.drawingEnabled&&this.figure.lineNum>0){var t=r.recognize(this.figure);this.figure.color=t.color,this.figure.tag=t.tag,this.repaint(),this.$message({message:"识别结果："+this.figure.tag,type:"success"});var e=this.figure.clone();this.paintingData.push(e),this.figure=new N,this.line=new $,this.drawingEnabled=!1}else this.$message({message:"未进行绘制！请开始绘制！",type:"warning"})}}},_={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"canvas-container"},[e("div",{staticClass:"paint-area"},[e("canvas",{attrs:{id:"canvas"}})])])}]};var D={name:"App",components:{CanvasPane:n("VU/8")(k,_,!1,function(t){n("bVev")},"data-v-f29b015e",null).exports,AsidePane:d,HeaderPane:u}},F={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-container",{staticClass:"whole-page"},[e("el-header",[e("header-pane")],1),this._v(" "),e("el-container",[e("el-aside",[e("aside-pane")],1),this._v(" "),e("el-main",[e("canvas-pane")],1)],1)],1)},staticRenderFns:[]};var E=n("VU/8")(D,F,!1,function(t){n("dTse")},null,null).exports,S=n("/ocq");i.default.use(S.a);var O=new S.a({routes:[]}),P=n("zL8q"),L=n.n(P),R=(n("tvR6"),n("fC7K"));i.default.use(L.a),i.default.use(R.a),i.default.use(a.a),new i.default({el:"#app",router:O,store:o,components:{App:E},template:"<App/>",render:function(t){return t(E)}})},bVev:function(t,e){},dTse:function(t,e){},lylk:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.a603c6b9d67550b61968.js.map