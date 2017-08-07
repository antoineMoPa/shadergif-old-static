#include <iostream>
#include <string>

int main(int argc, char ** argv)
{
	std::string path = "/";

	if(argc >= 2)
	{
		path = argv[1];
	}

	std::string mime = "text/plain";

	if(argc >= 3)
	{
		mime = argv[2];
	}

	std::string buffer;
	std::string line;
	
	while (std::getline(std::cin, line))
	{
		buffer += line + "\r\n";
	}

	std::cout << "HTTP/1.1 " << path << "\r\n";
	std::cout << "Content-type: " << mime << "\r\n";
	std::cout << "Content-Encoding: UTF-8" << "\r\n";	
	std::cout << "Access-Control-Allow-Origin: http://127.0.0.1" << "\r\n";	
	std::cout << "Access-Control-Allow-Methods: GET, POST" << "\r\n";
	std::cout << "Access-Control-Allow-Headers: content-type" << "\r\n";
	std::cout << "Content-Length: " << buffer.length() << "\r\n";
	std::cout << "Connection: close" << "\r\n";

	std::cout << "" << "\r\n";
	std::cout << buffer << "\r\n";

	return 0;
}
