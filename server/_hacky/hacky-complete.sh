
function _hacky {
	local cur

	cur=${COMP_WORDS[COMP_CWORD]}

	commands_folder=""
	
	if [[ -e commands ]]; then
		# in hacky root
		commands_folder=commands
	elif [[ -e ../../commands ]]; then
		# in app/native folder
		commands_folder=../../commands
	fi

	commands=$(ls $commands_folder | grep -o "^[A-Za-z\-]*$")
	
	COMPREPLY=( $(compgen -W '$commands' -- $cur ) )
}

complete -F _hacky ./hacky
