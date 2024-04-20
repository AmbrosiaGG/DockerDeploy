const Docker = require('dockerode');
const express = require('express')

const app = express()

let bodyParser = require('body-parser')
app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const docker = new Docker(); // Default docker sock

console.log('Re-Building base image :D please wait')
require("child_process").execSync('cd ./docker/cloud_deploy/base && docker build -t cloudbase .', { stdio: "inherit"
})

docker.createContainer({
    Image: 'cloudbase',
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: true,
    StdinOnce: false
  })

app.listen(3094, async () => {
    console.log('Whats the password? 3094? correct')
})

