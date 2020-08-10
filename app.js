const http = require('http')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const port = 8000

const server = http.createServer((req, res) => {
    const url_array = req.url.split('/')
    try {
        switch (url_array[1]) {
            case 'html':
                let path1 = './index.html';
                if (fs.existsSync(path1)) {
                    res.writeHead(200, { 'Contest-type': 'text/html' })
                    let data = fs.readFileSync(path1, 'utf8');
                    res.write(data)
                    res.end()
                } else {
                    throw "HTML Page Not Found"
                }
                break;
            case 'json':
                let path = './data.json'
                if (fs.existsSync(path)) {
                    res.setHeader("Content-Type", "application/json");
                    let data = fs.readFileSync(path, 'utf8');
                    res.write(data)
                    res.end(`{"message": "This is a JSON Response"}`);
                }
                else {
                    throw "Json File Not Found"
                }
                break;
            case 'uuid':
                res.write(`{"uuid" : ${uuidv4()}}`)
                res.end()
                break;
            case 'status':
                const statusCode = url_array[2]
                status = { "100": "Informational responses", "200": "Successful responses", "300": "Redirects", "400": "Client Error", "500": "Server Error" }
                if (Number.isInteger((parseInt(statusCode)))) {
                    res.writeHead(statusCode, { "Content-Type": "text/plain" });
                    res.write(` The Status_Code is : ${status[statusCode]}`)
                    res.end()
                }
                else {
                    throw "Status Code Not Valid"
                }
                break;
            case 'delay':
                const delayTime = url_array[2];
                if (Number.isInteger((parseInt(delayTime)))) {
                    res.write(`delay time is ${delayTime} secound`)
                    setInterval(() => {
                        res.end()
                    }, delayTime * 1000)
                }
                else {
                    throw "Secound's is Not In Number"
                }
                break;
            default:
                throw "Bad response not a vaild entry!! Try Again "
        }
    }
    catch (error) {
        console.log("Error has occured :")
        res.writeHead(404)
        res.write(`Error at : ${url_array} Not Found  : message : ` + error)
        res.end(`{"message": "This is the Error Response from Catch ${url_array} is not a vaild entry"}`);
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

