import express, { Request, Response } from "express";

const app = express();

const port = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, username: 'anson', displayName: 'Anson'},
    {id: 2, username: 'bob', displayName: 'Bob'},
    {id: 3, username: 'charlie', displayName: 'Charlie'},
];


app.get('/', (req: Request, res: Response) => {
    res.send(mockUsers);
});

app.get('/api/users/:id', (req: Request, res: Response) => {
    console.log(req.params);
    const parseId = parseInt(req.params.id);
    const user = mockUsers.find((user) => user.id === parseId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User not found');
    }
    console.log(user);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});