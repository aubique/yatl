echo "Update typescript compiler..."
if [[ "$PWD" =~ yatl$ ]]; then
	echo "Move from root directory";
	cd angular/;
elif [[ "$PWD" =~ misc$ ]]; then
	echo "Move from misc sub-directory";
else
	echo "Unknown source directory, aborting...";
	exit 1;
fi

sudo npm install typescript@">=3.6.4 <3.8.0" --save-dev --save-exact
