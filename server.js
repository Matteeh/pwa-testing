const express = require('express');

const app = express();

app.use(express.static(__dirname + '/www'));

// ===== BOOT =========================
const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`App listening at http://${host}:${port}`);

});
