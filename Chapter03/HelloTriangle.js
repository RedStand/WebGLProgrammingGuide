var VSHADER_SOURCE = 
'attribute vec4 a_Position;' + 
'void main(){'+
'gl_Position = a_Position;'+
'}';

var FSHADER_SOURCE = 
'void main(){gl_FragColor = vec4(1.0,0.0,0.0,1.0);}';

function main(){
    var canvas = document.getElementById('webgl');

    var gl=getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context!');
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders');
        return;
    }

    var n = initVertexBuffers(gl);
    if(n<0){
        console.log('Failed to ser the positions of the vertices');
        return;
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.drawArrays(gl.TRIANGLES,0 , n);
    //gl.drawArrays(gl.LINES , 0 , n);
    //gl.drawArrays(gl.LINE_STRIP , 0 , n);
    gl.drawArrays(gl.LINE_LOOP , 0 , n);
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
    ]);

    var n = 3;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER , vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER , vertices , gl.STATIC_DRAW);

    var a_Position  = gl.getAttribLocation(gl.program , 'a_Position');

    if(a_Position<0){
        console.log('Failed to get the stroage location');
        return -1;
    }

    gl.vertexAttribPointer(a_Position , 2 , gl.FLOAT , false  , 0,0);

    gl.enableVertexAttribArray(a_Position);
    return n;

}