var VSHADER_SOURCE = 
'attribute vec4 a_Position;' + 
'void main(){'+
'gl_Position = a_Position;'+
'gl_PointSize = 10.0;' + 
'}';

var FSHADER_SOURCE = 
'precision mediump float;'+
'uniform vec4 u_FragColor;' + 
'void main(){'+
'gl_FragColor = u_FragColor ; '+
'}';

function main(){
    var canvas  = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);

    if(!gl){
        console.log('Failed to get the rebdering context.');
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders.');
        return;
    }

    var a_Position =gl.getAttribLocation(gl.program , 'a_Position');
    if(a_Position<0){
        console.log('Failed to get the stroage locaion of a_Position');
        return;
    }

    var u_FragColor  = gl.getUniformLocation(gl.program , 'u_FragColor');

    if(u_FragColor<0){
        console.log('Failed to get the stroage location of u_FragColor');
        return;
    }

    canvas.onmousedown = function(ev){click(ev , gl,canvas,a_Position , u_FragColor)};

    gl.clear(gl.COLOR_BUFFER_BIT);
}


var g_points = [];
var g_colors = [];
function click(ev,gl,canvas,a_Position,u_FragColor){
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width /2) / (canvas.width /2);
    y = (canvas.height/2 - (y - rect.top))/ (canvas.height / 2);

    g_points.push([x,y]);

    if(x>=0 && y>=0){
        g_colors.push([1.0,0.0,0.0,1.0]);
    } else if(x<0 && y <0){
        g_colors.push([0.0,1.0,0.0,1.0]);
    }else{
        g_colors.push([0.0,0.0,1.0,1.0]);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(i = 0;i<len;i++){
        var xy= g_points[i];
        var color = g_colors[i];

        gl.vertexAttrib3f(a_Position , xy[0],xy[1],0.0,1.0);
        gl.uniform4f(u_FragColor , color[0] , color[1],color[2],color[3]);

        gl.drawArrays(gl.POINTS , 0,1);
        }

}