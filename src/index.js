const request = require('request');
const express = require('express');
const {
    TELEGRAM_BASE_URL,
    TELEGRAM_BOT_TOKEN
} = require('./config/environment');

const app = express();



request(`${TELEGRAM_BASE_URL}/bot${TELEGRAM_BOT_TOKEN}/getUpdates`, {}, (err, res, body) => {

    let resBody = JSON.parse(body);
    let users = [];

    let updates = resBody.result.map(x => {
        if (!x.message) return;
        return x.message.from
    });

    updates.forEach(item => {
        if (item && (users.length === 0 || users.find(x => x.id !== item.id)))
            users.push(item);
    });

});
