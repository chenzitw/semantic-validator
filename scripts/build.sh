rm -rf ./dist
mkdir dist
NODE_ENV=production tsc --build
cp ./packages/semantic-validator/package.json ./dist/package.json
cp ./README.md ./dist/README.md
cp ./LICENSE ./dist/LICENSE