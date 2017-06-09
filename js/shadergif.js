/*
  Resources: 
  
  * https://gist.github.com/mbostock/5440492
  * http://memfrag.se/blog/simple-vertex-shader-for-2d
  * https://www.opengl.org/wiki/Data_Type_%28GLSL%29#Vector_constructors
  * https://www.opengl.org/wiki/Built-in_Variable_%28GLSL%29
  * https://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf

  */

var is_example = window.location.href.match(/\?file\=([a-zA-Z0-9\/]+\.glsl)/);

var cm_errorLines = [];

function default_fragment_policy(){
    var code = "";
    
    if(window.localStorage.code != undefined && window.localStorage.code != ""){
        code = window.localStorage.code;
    } else {
        code = load_script("default-fragment-shader");
    }

    return code;
}

var app = new Vue({
    el: "#shadergif-app",
    data: {
        canvas: null,
        error: "",
        code: default_fragment_policy(),
        width: 540,
        height: 540,
    },
    watch: {
        width: function(w){
            this.canvas.width = w;
        },
        height: function(h){
            this.canvas.height = h;
        }
    },
    methods: {
        code_change: function(){
            window.localStorage.code = this.code;
            update_shader();
        }
    }
});

function resize(){
    var parent = qsa(".vertical-scroll-parent")[0];
    if(window.innerWidth > 768){
        parent.style.height = window.innerHeight + "px";
    } else {
        parent.style.height = "auto";
    }
}
resize();
window.addEventListener("resize",resize);

var anim_len = 10;
var anim_delay = 100;
var frame = 0;

var filename = "";

if(is_example != null){
    filename = is_example[1] || "";
}

// Canvas for making gifs
var gif_canvas = qsa(".gif-canvas")[0];
gif_canvas.width = 540;
gif_canvas.height = 540;

app.canvas = gif_canvas;

var gif_ctx = gif_canvas.getContext("webgl");

var fragment_error_pre = qsa(".fragment-error-pre")[0];
var vertex_error_pre = qsa(".vertex-error-pre")[0];

init_ctx(gif_ctx);

function init_ctx(ctx){
    ctx.clearColor(0.0, 0.0, 0.0, 1.0);
    ctx.enable(ctx.DEPTH_TEST);
    ctx.depthFunc(ctx.LEQUAL);
    ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);

    // Triangle strip for whole screen square
    var vertices = [
            -1,-1,0,
            -1,1,0,
        1,-1,0,
        1,1,0,
    ];
    
    var tri = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER,tri);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);
}

var vertex_code = load_script("vertex-shader");
var fragment_code = qsa("textarea[name='fragment']")[0];

// Enable codemirror

var f_editor = CodeMirror.fromTextArea(fragment_code, {
    lineNumbers: true,
});


//f_editor.setCursor({line: 10, ch: 0});
f_editor.addOverlay("dfdasfdd");

// Fetch file and put it in textarea
if(filename != ""){
    try{
        var xhr = new XMLHttpRequest;
        xhr.open('GET', "./" + filename, true);
        xhr.onreadystatechange = function(){
            if (4 == xhr.readyState) {
                var val = xhr.responseText;
                f_editor.setValue(val);
            }
        };
        xhr.send();
    } catch (e){
        // Do nothing
    }
}

f_editor.on("change", function(){
    app.code = f_editor.getValue();
    app.code_change();
});

update_shader();

function update_shader(){
    init_program(gif_ctx);
}

function add_error(err, type_str, type_pre){
    var line = err.match(/^ERROR: [0-9]*:([0-9]*)/)[1];
    line = parseInt(line) - 1;
    var errline = f_editor.addLineClass(line, "background", "errorline");
    cm_errorLines.push(errline);
    type_pre.textContent =
        "Error in " + type_str + " shader.\n" +
        err;
    
}

function init_program(ctx){
    ctx.program = ctx.createProgram();

    // Remove previous errors
    for(var err in cm_errorLines){
        f_editor.removeLineClass(cm_errorLines[err],"background");
    }
    
    var vertex_shader =
        add_shader(ctx.VERTEX_SHADER, vertex_code);
    
    var fragment_shader =
        add_shader(ctx.FRAGMENT_SHADER, f_editor.getValue());
    
    function add_shader(type,content){
        var shader = ctx.createShader(type);
        ctx.shaderSource(shader,content);
        ctx.compileShader(shader);

        // Find out right error pre
        var type_pre = type == ctx.VERTEX_SHADER ?
            vertex_error_pre:
            fragment_error_pre;
        
        if(!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)){
            var err = ctx.getShaderInfoLog(shader);
            
            // Find shader type
            var type_str = type == ctx.VERTEX_SHADER ?
                "vertex":
                "fragment";
            
            add_error(err, type_str, type_pre);

            return -1;
        } else {
            type_pre.textContent = "";
        }

        ctx.attachShader(ctx.program, shader);
        
        return shader;
    }

    if(vertex_shader == -1 || fragment_shader == -1){
        return;
    }
    
    ctx.linkProgram(ctx.program);
    
    if(!ctx.getProgramParameter(ctx.program, ctx.LINK_STATUS)){
        console.log(ctx.getProgramInfoLog(ctx.program));
    }
    
    ctx.useProgram(ctx.program);

    var positionAttribute = ctx.getAttribLocation(ctx.program, "position");
    
    ctx.enableVertexAttribArray(positionAttribute);
    ctx.vertexAttribPointer(positionAttribute, 3, ctx.FLOAT, false, 0, 0);
    
}

function draw_ctx(can, ctx, time){
    // Set time attribute
    var tot_time = anim_len * anim_delay;

    var time = time ||
        parseFloat(
            ((new Date()).getTime() % tot_time)
                /
                tot_time
        );
    
    var timeAttribute = ctx.getUniformLocation(ctx.program, "time");
    ctx.uniform1f(timeAttribute, time);
    
    // Screen ratio
    var ratio = can.width / can.height;

    var ratioAttribute = ctx.getUniformLocation(ctx.program, "ratio");
    ctx.uniform1f(ratioAttribute, ratio);

    ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, 4);

    ctx.viewport(0, 0, can.width, can.height);

}

var rendering_gif = false;

function draw(){
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

setInterval(
    function(){
        frame++;
        frame = frame % (anim_len);
        
        window.requestAnimationFrame(function(){
            // When rendering gif, draw is done elsewhere
            if(!rendering_gif){
                draw_ctx(gif_canvas, gif_ctx, (frame + 1)/(anim_len));
            }
        });
    }
    , anim_delay
);

var gif_button = qsa("button[name='make-gif']")[0];
var png_button = qsa("button[name='make-png']")[0];

gif_button.addEventListener("click", make_gif);
png_button.addEventListener("click", make_png);

// Render all the frames to a gif
function make_gif(){
    var to_export = {};
    
    to_export.delay = anim_delay;
    to_export.data = [];
    
    rendering_gif = true;
    
    for(var i = 0; i < anim_len; i++){
        draw_ctx(gif_canvas, gif_ctx, (i + 1)/anim_len);
        
        to_export.data.push(gif_canvas.toDataURL());
    }

    rendering_gif = false;
    
    export_gif(to_export);
}

// Render all the frames to a png
function make_png(){
    rendering_gif = true;
    
    var tempCanvas = document.createElement("canvas");
    var canvas = tempCanvas;
    
    canvas.width = gif_canvas.width;
    canvas.height = gif_canvas.height * anim_len;
    var ctx = canvas.getContext("2d");

    var i = 0;

    /*
      "Unrolled" async loop:
      for every image:
      render & load image
      onload: add to canvas
      when all are loaded: create image from canvas
     */
    function next(){
        if(i < anim_len){
            var curr = i;
            draw_ctx(gif_canvas, gif_ctx, (curr + 1)/anim_len);
            var image_data = gif_canvas.toDataURL();
            var temp_img = document.createElement("img");
            temp_img.src = image_data;
            temp_img.onload = function(){
                ctx.drawImage(temp_img, 0, curr * gif_canvas.height);
                next();
            }
        } else {
            // Final step
            var image_data = canvas.toDataURL();
            var image = document.createElement("img");
            image.src = image_data;
            rendering_gif = false;
            var images_div = qsa(".result-images")[0];
            images_div.insertBefore(image, images_div.firstChild);
        }
        i++;
    }
    
    next();
}

// Make the gif from the frames
function export_gif(to_export){
    var gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: "gif-export/lib/gifjs/gif.worker.js"
    });
    
    data = to_export.data;
    
    var images = [];
    
    for(var i = 0; i < data.length; i++){
        var image = new Image();
        image.src = data[i];
        image.onload = imageLoaded;
        images.push(image);
    }
    
    var number_loaded = 0;
    function imageLoaded(){
        number_loaded++;
        if(number_loaded == data.length){
            convert();
        }
    }
    
    function convert(){
        for(var i = 0; i < images.length; i++){    
            gif.addFrame(images[i],{delay: to_export.delay});
        }
        
        gif.render();
        
        var images_div = qsa(".result-images")[0];
        
        gif.on('finished',function(blob){
            // Create image
            var img = dom("<img>");
            img.src = URL.createObjectURL(blob);

            // Add it to the body
            images_div.insertBefore(img, images_div.firstChild);
        })
    }
}
