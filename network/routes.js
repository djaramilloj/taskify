const express = require('express');
const task = require('../components/task/network');

const server = (app) => {
    app.use('/task', task);
}

module.exports = server;
