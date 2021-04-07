var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var current = 0;
var padding = 50;
var data = [123,123,343,541,400];
var rate;
var Xlength;
customChart()
function customChart(){
var interval = data.length;
var Maxnumber = Math.max(...data);
let rateH = height - padding*2;

var NUMmax = Maxnumber.toString().length;
let percent = '1';
for(let i = 1;i<NUMmax;i++){
	percent += '0';
}
let yxai = Math.ceil(Maxnumber/percent)*percent;
if(Maxnumber>rateH){
	 rate = yxai/rateH;
}else{
	 rate = 1;
}

coordinate(yxai,interval,percent);
}

function coordinate(yxai,interval,percent){
    //画坐标轴X
    ctx.moveTo(padding + 0.5,padding + 0.5);
    ctx.lineTo(padding + 0.5,height - padding + 0.5);
    ctx.stroke();
//画坐标轴Y
ctx.moveTo(padding + 0.5,height - padding + 0.5);
ctx.lineTo(width - padding + 0.5,height - padding + 0.5);
ctx.stroke();

ctx.textAlign = 'center';

//坐标间隔长度
 Xlength = (width - padding * 2)/interval;
var Ylength = (height - padding * 2)/(yxai/percent);
//坐标突起X轴
for(let i = 1;i <= interval;i++){
ctx.moveTo(padding + Xlength*i+0.5,height - padding + 0.5);
ctx.lineTo(padding + Xlength*i+0.5,height - padding + 0.5 + 5);
ctx.fillText(data[i-1],padding+Xlength*i-Xlength/2+0.5,height - padding + 0.5+15);
ctx.stroke();
}
//坐标突起Y轴
for(let i = 1;i <= yxai/percent;i++){
ctx.moveTo(padding+0.5,height - padding-Ylength*i+0.5);
ctx.lineTo(padding - 5+0.5,height - padding-Ylength*i+0.5);
ctx.fillText(percent*i,padding-20+0.5,height - padding-Ylength*i+0.5+3);
ctx.stroke();
}

looping();
}

function looping() {
console.log();
looped = requestAnimationFrame(looping);
if(current < 100){
// current 用来计算当前柱状的高度占最终高度的百分之几，通过不断循环实现柱状上升的动画
current = (current + 3) > 100 ? 100 : (current + 3);
drawAnimation();
}else{
window.cancelAnimationFrame(looped);
looped = null;
}
}

function drawAnimation() {
for(var i = 0; i < data.length; i++) {
var x = Math.ceil((data[i] * current / 100) / rate);
var y = height - padding - x;

	ctx.fillRect(padding + Xlength * (i + 0.25), y, Xlength/2, x);
    // 保存每个柱状的信息
   /* data[i].left = padding + xLength / 4 + xLength * i;
    data[i].top = y;
    data[i].right = padding + 3 * xLength / 4 + xLength * i;
    data[i].bottom = height - padding;*/
}
}
