// usar express
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

var protocolo = process.env.AMBIENTE == 'DEV' ? 'http://' : 'https://';
var allowlist = JSON.parse(process.env.CORS_DOMINIOS).map(url => `${protocolo}${url}`)


app.use(cors({
    origin: function(origin, callback){
      //console.log('origin --------------------', origin)
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowlist.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));