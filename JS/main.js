
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
 
let base = [100, 600];

function createDis(){
	let dis = [];
	let n = 100;
	for(let i=0;i<n+1;i++){
		dis[i]=1/n
	}
	return dis;
}

let dis = createDis();


drawDistribution(base, dis);

function drawLine(x, y) {
	context.beginPath();
	context.moveTo(x[0], x[1]);
	context.lineTo(y[0], y[1]);
	context.stroke();
}

function drawDistribution(base, arr) {
	let l = dis.length - 1;
	let max = Math.max.apply(null, arr);
	drawLine([100, 600], [620, 600] )
		context.font = '14pt Calibri';
		context.fillStyle = 'blue';
	for(let i=0;i<11;i++){
		let text = i;
		if (text === 0) text = "0.0";
		else if (text === 10) text = "1.0";
		else text = i/10;
		context.fillText(text, base[0] + -2 + i * 50, base[1] + 20);	
	}
	arr.forEach((value, key)=>{
		drawLine([base[0] + 10 + key * 500/l, base[1] - 0], [base[0] + 10 + key * 500/l, base[1] - (400/max) * value])
	});
}

let counter = {zeros:0, ones:0};

function bayenes (x) {

	if (x === 0) counter.zeros += 1;
	if (x === 1) counter.ones +=1;
	
	let newDis = dis.slice();
	let oldDis = dis;

	let l = dis.length - 1;

	if (x === 1) {
		let a = 0;
		oldDis.forEach((value, key) => {a += (key/l) * value});
		oldDis.forEach((value, key) => {newDis[key] = (oldDis[key] * key/l) / a});
	} else if (x === 0) {
		let a = 0;
		oldDis.forEach((value, key) => {a += (1 - key/l) * value});
		oldDis.forEach((value, key) => {newDis[key] = (oldDis[key] * (1 - key/l)) / a});
	} else {
		window.console.log ("ERROR: MUST BE 0 or 1")
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	dis = newDis;
    drawDistribution(base, dis);
	drawInfo();
	
	return newDis;
	
}

function drawInfo () {
	context.fillText("number of zeros: " + counter.zeros, 100, 100)
    context.fillText("number of ones: " + counter.ones, 100, 120)
}