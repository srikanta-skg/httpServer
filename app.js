const http = require('http')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const port = 4000

const server = http.createServer((req, res) => {
    const url_array = req.url.split('/')
    //console.log(url_array);
    switch (url_array[1]) {
        case 'html':
            res.writeHead(200, { 'Contest-type': 'text/html' })
            fs.readFile('index.html', (error, data) => {
                if (error) {
                    res.writeHead(404)
                    res.write('Error: File Not Found')
                }
                else {
                    res.write(data)
                }
                res.end()
            })
            break;
        case 'json':
            res.setHeader("Content-Type", "application/json");
            fs.readFile('data.json', (error, data) => {
                if (error) {
                    res.writeHead(404)
                    res.write('Error: File Not Found')
                }
                else {

                    res.write(data)
                }
                res.end(`{"message": "This is a JSON response"}`);
            })
            break;
        case 'uuid':
            res.write(`{"uuid" : ${uuidv4()}}`)
            res.end()
            break;
        case 'status':
            const statusCode = url_array[2]
            res.statusCode = statusCode
            res.write(` The Status_Code is : ${statusCode}`)
            res.end()
            break;
        case 'delay':
            const delayTime = url_array[2]
            res.write(`delay time is ${delayTime} secound`)
            setInterval(() => {
                res.end()
            }, delayTime * 1000)
    }
})
server.listen(port, error => {
    if (error) {
        console.log("somthing is wrong", error)
    }
    else {
        console.log('server is listening on port : ' + port)
    }
})