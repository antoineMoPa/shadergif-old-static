Create & serve bash APIs and web apps

The default app comes with Vue.js, Zepto.js and Bootstrap (css), but all of this can be changed.

# Getting started

## Getting Hacky

Via git:

	git clone https://github.com/antoineMoPa/hacky.git

## Creating new apps

To create a new app, do this:
	
	./hacky new app myapp

This creates a new app named "myapp" in /apps/myapp

## Creating native C++ commands

Native commands are reusable pieces of software that can be more
efficient and powerful than bash code alone. To create a new one, do this:

	# (into hacky folder)
	./hacky new native mycommand

This will create example code and a makefile in hacky/native/mycommand

After running `./hacky build-native` in hacky folder or `make install` in 
your native command's folder, you can use your command with:

	./hacky mycommand.native

# Building native commands for more performance

Some parts of hacky exist in native form for better performance. To build them and
start using them, do this:

	./hacky build-native

# Bash completion
Run this to enable some hacky command completions for bash (using [tab][tab])

	source hacky-complete.sh
	
# Security

You should use this for offline personal projects or behind firewalls, but probably not on a production server. The reason is simple: the probability of having security vulnerabilities in a bash-based web application and in Hacky itself is huge.

## Summary

Do use this for:

* Personal projects
* Offline projects
* Servers where getting hacked does not matter

Don't use this for:

* Creating a social network
* Creating some IoT webserver

Of course, if you can perform a security audit and/or figure out a way to use Hacky safely in your production systems, the choice is yours.
