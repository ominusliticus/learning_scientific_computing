set -x

SOURCE=./_build/html
TARGET=~/Documents/Websites/ominusliticus.github.io/my_notes/learning_scientific_computing

if [ ! -d $TARGET ];
then 
    mkdir -p $TARGET
fi

cp -r $SOURCE $TARGET
