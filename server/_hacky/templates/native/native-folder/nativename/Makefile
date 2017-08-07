all: nativename.cpp
	g++ nativename.cpp -o nativename.native

nativename.native: all

install: nativename.native
	cp nativename.native ../../commands

clean:
	rm nativename.native
