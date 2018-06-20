const express = require('express');
const Pusher = require('pusher');
require('dotenv').config();
const stockData = require('./stock.json')
  
const app = express();
  
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});

let i = 0;
setInterval( () => {
  const GOOG = stockData[1]['Trades'][i];
  pusher.trigger('trade', 'stock', GOOG)
  i++
}, 2000);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log("Listening on port " + app.get('port'));
})