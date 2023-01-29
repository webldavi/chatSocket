const { serverHttp} = require('./http')
require('./websocket.js')
serverHttp.listen(3080, ()=>console.log('server is running on port 3000'))