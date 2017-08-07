#include <fstream>
#include <iostream>
#include <string>
#include <sstream>

/*  
	Get 1 file from stdin from a multipart string
	outputs content-disposition
 */

int main(int argc, char ** argv)
{
	std::string line;

	std::string boundary;
	std::string disp; /* content disposition string */
	std::string type; /* content type string */
	std::string file; /* actual file content */
	
	
	int i = 0;
	
	while (std::getline(std::cin, line))
	{
		if(i == 0){
			// Get boundary
			boundary = line.substr(0,line.length() - 1);
		} else if(line.find("Content-Disposition") == 0){
			disp = line;
		} else if(line.find("Content-Type") == 0){
			type = line;
		} else if(line.find(boundary) == 0){
			// The end
			type = line;
			break;
		} else if(line.length() == 1){
			// Time to get raw data
			
			std::ofstream outfile("data.tmp");
			char c;
			int bl = boundary.length();
			bool endfile = false;
			
			if(outfile){
				char buffer[256];
				
				while(!endfile){
					int j = 0;
					
					int k;
					
					while(j < 256 && std::cin.get(c) && !endfile){
						buffer[j] = c;

						k = 0;

						// Verify if we are at the end
						while(boundary[bl - 1 - k] == buffer[j - k]){
							if(k >= bl - 1){
								// We are at the end of the file
								endfile = true;
								break;
							}
							k++;
						}
						j++;
					}
					
					outfile.write(buffer, j);
					
					j = 0;
				};
			}
			outfile.close();
			break;
		}
		i++;
	}
	
	std::cout << disp << "\n";
	
	return 0;
}
