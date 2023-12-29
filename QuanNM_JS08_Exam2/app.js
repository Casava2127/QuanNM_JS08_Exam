//8082
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8082;
const path = require('path')
const fs = require('fs')
const http = require('http')
app.use(bodyParser.json())
const todos = require('./ask-community-project/todos.json');

app.get('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
app.post('/api/v1/todos', (req, res) => {
    const { title } = req.body;
    console.log((req.body));
    const existingTodo = todos.find((todo) => todo.title === title);

    if (!existingTodo) {
        const newTodo = { id: todos.length + 1, title };
        todos.push(newTodo);
        // đưa nó vào file todos.json
        require('fs').writeFileSync("C:/Users/pc/Desktop/VsCodeLap/Module3-Ri/QuanNM_JS08_Exam/QuanNM_JS08_Exam2/ask-community-project/todos.json", JSON.stringify(todos, null, 2))
        res.json({ message: 'Create successfully' });
    } else {
        res.json({ message: 'Todo already exists' });
    }
});
app.put('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], ...req.body };
        //sau khi put  thì sửa vào file todos.json
        require('fs').writeFileSync("C:/Users/pc/Desktop/VsCodeLap/Module3-Ri/QuanNM_JS08_Exam/QuanNM_JS08_Exam2/ask-community-project/todos.json", JSON.stringify(todos, null, 2))


        res.json({ message: 'Update successfully' });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
app.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
        // Lấy thông tin todo trước khi xóa
        const deletedTodo = todos[todoIndex];
        todos.splice(todoIndex, 1);
        // cập nhập lại file todos.json sau khi delete
        res.json({ message: 'Delete successfully' });

        // Cập nhật file todos.json sau khi xóa
        const todosFilePath = path.join(__dirname, 'ask-community-project', 'todos.json');
        const updatedTodosData = JSON.stringify(todos, null, 2);
        fs.writeFile(todosFilePath, updatedTodosData, 'utf-8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Delete successfully', deletedTodo });
            }
        });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
