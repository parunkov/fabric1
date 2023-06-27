import {fabric} from 'fabric';

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
  angle: 0
});

canvas.add(group);
// circle.set('fill', 'red');
// console.log(canvas.getObjects());
// canvas.on('mouse:down', function(options) {
//   console.log(options.e.clientX, options.e.clientY);
//   if (options.target) {
//     console.log('an object was clicked! ', options.target.type);
//   }
// });
console.log(group.item(0));

group.item(0).set('fill', 'red');
group.item(1).set({
  text: 'trololo',
  fill: 'white'
});

canvas.renderAll();