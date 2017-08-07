#include <iostream>
#include <string>

/*
  This example program adds "foo" to every line in input and
  outputs it. 
 */
int main(int argc, char ** argv)
{
    std::string line;
    
    while (std::getline(std::cin, line))
    {
		std::cout << line << "foo" << std::endl;
    }

    return 0;
}
