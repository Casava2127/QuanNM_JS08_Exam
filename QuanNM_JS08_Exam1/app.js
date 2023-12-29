8081
const express = require('express');

const app = express();
const port = 8081;



// dịnh nghĩa route để xử lý request và gửi response
app.get('/', (req, res) => {  // request khop voi duong dan goc
    res.send('Hello Quan');
    
});

// Khởi động server và lắng nghe trên cổng 8081
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



