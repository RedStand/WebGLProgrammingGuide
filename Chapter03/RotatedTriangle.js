var VSHADER_SOURCE =
'attribute vec4 a_Position;' + 
'uniform float u_CosB ,u_SinB;' + 
'void main(){' + 
'gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB ; ' + 
'gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB ; ' + 
'gl_Position.z = a_Position.z ;' +
'gl_Position.w = a_Position.w ; ' + 
'}';

var FSHADER_SOURCE = 
'void main(){gl_FragColor = vec4(1.0,0.0,0.0,1.0);}';

var ANGLE = 90;

function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context!');
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE , FSHADER_SOURCE)){
        console.log('Failed to initialize shaders');
        return ;
    }
    var n = initVertexBuffers(gl);
    if(n<0){
        console.log('Failed to set the positions of the vertices');
        return;
    }

    var radian = Math.PI * ANGLE  / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);

    var u_CosB = gl.getUniformLocation(gl.program , 'u_CosB');
    var u_SinB = gl.getUniformLocation(gl.program , 'u_SinB');

    gl.uniform1f(u_CosB , cosB);
    gl.uniform1f(u_SinB , sinB);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
    ]);

    var n = 3;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer obejct');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER , vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER , vertices , gl.STATIC_DRAW);

    var a_Position  = gl.getAttribLocation(gl.program , 'a_Position');

    if(a_Position<0){
        console.log('Failed to get the stroage location');
        return -1;
    }

    gl.vertexAttribPointer(a_Position , 2, gl.FLOAT  , false ,0 , 0);

    gl.enableVertexAttribArray(a_Position);
    return n;
}