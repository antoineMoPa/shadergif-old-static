all: get_file.cpp
	g++ get_file.cpp -o get_file.native

get_file.native: all

install: get_file.native
	cp get_file.native ../../commands

clean:
	rm get_file.native
