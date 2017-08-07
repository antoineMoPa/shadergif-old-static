all: shadergif_http_wrap.cpp
	g++ -std=c++0x shadergif_http_wrap.cpp -o shadergif_http_wrap.native

shadergif_http_wrap.native: all

install: shadergif_http_wrap.native
	cp shadergif_http_wrap.native ../../commands

clean:
	rm shadergif_http_wrap.native
