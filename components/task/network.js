const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');


router.get('/', (req, res) => {
    controller.getTasks()
        .then(data => {
            res.render('main', {
                layout: 'index',
                tasks: data,
            });
        })
        .catch(e => {
            response.error(req,res, 'ver consola', 500, e);
        })
})


router.post('/', (req, res) => {    
    controller.addTask(req.body.task, req.body.priority)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(e => {
            response.error(req, res, 'Información inválida', 400, e)
        })
})


module.exports = router;