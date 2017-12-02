# Project++

Hello! There is a new ruby on rails project based on this at the following URL:

https://github.com/antoineMoPa/shadergif

# ShaderGif

A tool to play with fragment shaders to create nice 2D images. (Because fragment shaders are awesome.)

Features gif export, png export & GPU sound creation.

# Trying the server

The small bash server allows to send images efficiently to your computer.

Currently, if you want to use the server, you have to install apache2 and shadergif in your public html folder. Reason: CORS request are setup to only support 127.0.0.1 . This will probably change in the future.

Then, you can start the server:

    bash start_server.sh

When you visit http://127.0.0.1/wherever_you_installed_shadergif, you should see a new button ("Send to server"). The images will be stored in ~/shadergif-images/.
		
# Branches

## Master

The original 2D shadergif.

http://a-mo-pa.com/stuff/shadergif/

## Volumegif

Switch to this branch for volumetric fun.

http://a-mo-pa.com/stuff/shadervolume/

# Uniforms

time - goes from 0.0 to 1.0 and repeats

ratio - The screen ratio (Can be used to adapt the code for the big & small canvases)

# Examples

Jellyfish: http://a-mo-pa.com/stuff/shadergif/?file=examples/jellyfish.glsl

![jellyfish-gif](http://67.media.tumblr.com/99a2e2a0055a5ba480c3d034db5d95b7/tumblr_ocaant6fWH1svno9go1_500.gif)

Rio: http://a-mo-pa.com/stuff/shadergif/?file=examples/rio.glsl

![rio](http://66.media.tumblr.com/31f918444dfeb6977d1a0818b5aed8d5/tumblr_oc62fccF031svno9go1_500.gif)

Bridge: http://a-mo-pa.com/stuff/shadergif/?file=examples/bridge.glsl

![Bridge](http://67.media.tumblr.com/1c175c8fd49c8be7ad155b7acddc850f/tumblr_oc6ennIUP41svno9go1_500.gif)

#  More images

Visit my tumblr, you may find some gifs made with this: http://dontcode.tumblr.com
