// export { create, createReportList };
import { create, createReportList } from './modules/canvas.js';

// export { name, draw, reportArea, reportPerimeter };
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';

// export default randomSquare;
import randomSquare from './modules/square.js';

let myCanvas = create('myCanvas', document.body, 480, 320);
let reportList = createReportList(myCanvas.id);

let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

// Use the default
let square2 = randomSquare(myCanvas.ctx);
