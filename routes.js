const requestHandler = (req, res) => {
    const {url, method} = req;

    if (url === '/') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Some greeting</title></head>');
        res.write('<body>');
        res.write('<p>Hello task 1</p>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="create-user"/><button type="submit">Create user</button><form>');
        res.write('</body>');
        res.write('</html>');
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users list</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const [, user] = parsedBody.split('=');
            console.log('New user created', user);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }

}

module.exports = requestHandler;