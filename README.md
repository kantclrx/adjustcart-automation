# Automation test assignment

## How to run test

### Install dependencies in your local machine
```
npm install
```

### Run test with Chrome headless
```
npm run cypress-run-chrome-headless
```

### In case you want to run test in Docker container
#### Build image and run test
```
docker build -f Dockerfile -t {tag-image} .
```
