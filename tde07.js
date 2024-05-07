const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para analisar corpos de requisição JSON
app.use(bodyParser.json());

// Array para armazenar as tarefas
let tasks = [];

// Rota para exibir a lista de tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa existente
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, ...updatedTask };
        }
        return task;
    });
    res.json(updatedTask);
});


app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.sendStatus(204);
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
