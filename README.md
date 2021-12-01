# Automation test assignment

## How to run test

### Install dependencies in your local machine
```
cd {this repo}
npm install
```

### Run test with headless Chrome
```
npm run cypress-run-chrome-headless
```

### Incase you want to run test in Docker container
#### Build image and run test
```
docker build -f Dockerfile -t {tag-image-name} .
```
