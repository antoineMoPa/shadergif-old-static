Bash is a weird language from a human's perspective. Here are some quick references to help your learn.

# if statements

	var="testvalue"
	if [[ $var = "testvalue" ]]; then
		echo "success"
	else
		echo "fail"
	fi
	
# Comparing strings

See the previous example (if statements).
	
# Comparing numbers

You can use -ge -lt (lower than) and many more (Look the internet for bash integer comparison).

	num=5
	if [[ $num -ge 1 ]]; then
		echo "greater or equal"
	else
		echo "lower"
	fi

	
# Checking the number of arguments

The variable $# contains the number of arguments. Hence, you can
check the number of arguments like this:
	
	if [[ $# -ge 1 ]]; then
		echo "enough arguments"
	fi

# Writing for loops

You can do

	for i in 1 2 3 4 5 6 7 8 9 10; do
		echo "hello"
	done

Or better:
	
	for i in $(seq 1 10); do
		echo "hello"
	done

You can loop over files (or command results from $()):

	for i in $(ls); do
		echo $i
	done

In fact, seq is a shell command. (try seq 1 4)

# Piping

The act of piping is the act of feeding a program's output to a program's input.

	echo "bla" | grep -o "la"

Everything that the first command shows (the line: bla) will be sent to grep.
In this case, we use grep to optain only the part that matches "la".

# Basic grep

todo

# Basic grep Regular expression

todo
	
# Basic sed replacements

todo

# Advanced use of cat

todo