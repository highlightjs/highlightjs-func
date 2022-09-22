#!/usr/bin/env bash

set -e

# Where to copy the project, gitignored
HLJS_DIR='highlightjs'

# Clone the tool itself:
if [ -d "$HLJS_DIR" ]; then
  cd "$HLJS_DIR"
  git pull
else
  git clone https://github.com/highlightjs/highlight.js "$HLJS_DIR"
  cd "$HLJS_DIR"
fi

# Install requirements
npm install

# Symlink current project into `extras/` folder:
ln -sF "$(dirname "$PWD")" "$PWD"/extra/highlightjs-func

# Now, go back to the root of the project and run build
node "./tools/build.js" -t cdn

# Cleaning up:
rm -rf "$PWD"/extra/highlightjs-func
echo 'done'
