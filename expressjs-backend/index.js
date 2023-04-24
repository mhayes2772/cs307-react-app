const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}

function addUser(user){
    users['users_list'].push(user);
}

function deleteUser(user){
    const index = users['users_list'].indexOf(user);
    users['users_list'].splice(index, 1);
}

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined){
        let result = findUserByName(name);
        if(job != undefined){
            result = result.find(user => user.job === job);
        }
        if(result == undefined){
            res.status(404).send("resource not found");
        }
        else{
            result = {users_list: result};
            res.send(result);
        }
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    userToAdd.id = uuidv4();
    res.send(userToAdd);
    res.status(201).end();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let userToDelete = findUserById(id);
    if (userToDelete === undefined || userToDelete.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(userToDelete);
        res.status(204).end();
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let userToDelete = findUserById(id);
    if (userToDelete === undefined || userToDelete.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(userToDelete);
        res.status(202).end();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  