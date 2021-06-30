const Express = require('express');

const app = Express();

app.listen(5000, () => {
    console.log(`[Server]: App is listening on 5000.`);
})