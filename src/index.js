import {fabric} from 'fabric';
console.log('fabric - ', fabric);

const canvas = new fabric.Canvas('myCanvas');

const circle = new fabric.Circle({
  radius: 40, 
  fill: 'blue', 
  originX: 'center',
  originY: 'center'
});
const text = new fabric.Text('Миша', {
  fontSize: 30,
  originX: 'center',
  originY: 'center'
});
const group = new fabric.Group([ circle, text ], {
  left: 210, 
  top: 160,
  angle: 0,
  selectable: false,
  hoverCursor: 'pointer'
});

const circle2 = new fabric.Circle({
  radius: 40, 
  fill: 'red', 
  originX: 'center',
  originY: 'center'
});
const text2 = new fabric.Text('Катя', {
  fontSize: 30,
  originX: 'center',
  originY: 'center'
});
const group2 = new fabric.Group([ circle2, text2 ], {
  left: 410, 
  top: 260,
  angle: 0,
  selectable: false,
  hoverCursor: 'pointer'
});
const line = new fabric.Line([250, 200, 450, 300], {
  stroke: 'black',
  hoverCursor: 'pointer',
  selectable: false,
  originX: 'center',
  originY: 'center'
});
// console.log(line.intersectsWithObject(circle2));
const text3 = new fabric.Text('25', {
  left: line.getCenterPoint().x,
  top: line.getCenterPoint().y,
  fontSize: 30,
  originX: 'center',
  originY: 'center',
  fill: 'red'
});
const triangle = new fabric.Triangle({
  width: 20, 
  height: 30, 
  fill: 'black', 
  left: 415, 
  top: 283,
  angle: 120,
  originX: 'center',
  originY: 'top',
});
const group3 = new fabric.Group([ line, text3, triangle ], {
  selectable: false,
  hoverCursor: 'pointer'
});

canvas.add(group3);
canvas.add(group);
canvas.add(group2);
// circle.set('fill', 'red');
// console.log(canvas.getObjects());
canvas.on('mouse:down', function(options) {
  // console.log(options.e.clientX, options.e.clientY);
  if (options.target) {
    if (options.target.item(0).type === 'circle') {
      console.log('Круг - ', options.target.item(1).text);
    }
    if (options.target.item(0).type === 'line') {
      console.log('Линия - ', options.target.item(1).text);
    }
  }
});

// group.item(0).set('fill', 'red');
// group.item(1).set({
//   text: 'trololo',
//   fill: 'white'
// });

// canvas.renderAll();
canvas.on('mouse:wheel', function(opt) {
  let delta = opt.e.deltaY;
  let zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
})

canvas.on('mouse:down', function(opt) {
  let evt = opt.e;
  // if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  // }/
});
canvas.on('mouse:move', function(opt) {
  if (this.isDragging) {
    let e = opt.e;
    let vpt = this.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});
canvas.on('mouse:up', function(opt) {
  // on mouse up we want to recalculate new interaction
  // for all objects, so we call setViewportTransform
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});

