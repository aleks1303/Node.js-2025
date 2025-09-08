// const http = require('node:http');
//
//
// const server = http.createServer((req, res) => {
//     if (req.url === '/users' && req.method === 'GET') {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({
//             data: 'Hello I am server'
//         }));
//         return;
//     }
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.end(JSON.stringify({
//         data: 'Hello I am server'
//     }));
//
// });
// server.listen(3000)
//
// замість цього використовуємо express

const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const users = [
    {id: 1, name: 'vasya', email: 'vas31@gmail.com', password: 'qwe233'},
    {id: 2, name: 'petya', email: 'pet30@gmail.com', password: '233eds'},
    {id: 3, name: 'kolya', email: 'kolya29@gmail.com', password: 'ddf3455'},
    {id: 4, name: 'olga', email: 'olga28@gmail.com', password: 'red3455'},
    {id: 5, name: 'max', email: 'max30@gmail.com', password: '43ew234'},
    {id: 6, name: 'anya', email: 'anya31@gmail.com', password: '4e3w2'},
    {id: 7, name: 'oleg', email: 'oleg28@gmail.com', password: '3we4r'},
    {id: 8, name: 'andrey', email: 'andrey29@gmail.com', password: 'dfr43'},
    {id: 9, name: 'masha', email: 'masha30@gmail.com', password: '432werf'},
    {id: 10, name: 'olga', email: 'olya31@gmail.com', password: '432dfg'},

];

app.get('/users', (req, res) => {
    try{
        res.send(users)
    } catch (e) {
       res.status(500).send(e.message)
    }
});
app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;
        const id = users[users.length - 1].id + 1;
        const newUser = {id, name, email, password};
        users.push(newUser);
        res.status(201).send(newUser)
    }
    catch (e){
        res.send(500).send(e.message)
    }

});
app.get('/users/:userId', (req, res) => {
  try {
      const userId = Number(req.params.userId);
      const user = users.find(user => user.id === userId);
      if (!user) {
          res.status(404).send('User Not found')
      }
      res.send(user)
      console.log(userId)
  } catch (e) {
res.status(500).send(e.message)
  }
});

app.put('/users/:userId', (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1){
          return res.status(404).send('User not found')
        }
        const {name, email, password} = req.body;
        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;
        res.status(201).send(users[userIndex])
    }
    catch (e){
        res.status(500).send(e.message)
    }
})

app.delete('/users/:userId', (req, res) => {
    try{
        const userId = Number(req.params.userId)
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex === -1) {
            res.status(404).send('User not found')
        }
        users.splice(userIndex, 1)
        res.sendStatus(204)
    }
    catch (e){
    res.status(500).send(e.message)
    }
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/users')
});
