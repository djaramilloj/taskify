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


router.post('/add-task', (req, res) => {    
    controller.addTask(req.body.task, req.body.priority)
        .then(data => {
            res.redirect('/task');
        })
        .catch(e => {
            response.error(req, res, 'Invalid Information', 400, e)
        })
})


router.get('/add-task', (req, res) => {
    res.render('taskForm', {
        layout: 'index',
    });
})


router.put('/:id', (req, res) => {
    console.log('me ejecute');
    
    const taskId = req.params.id;
    console.log(taskId);
    
    controller.finishTask(taskId)
        .then(data => {
            res.redirect('/task');
        })
        .catch(e => {
            response.error(req, res, 'Invalid Information', 500, e)
        })
})



module.exports = router;