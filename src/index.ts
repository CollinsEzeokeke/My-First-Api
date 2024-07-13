import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

interface User {
    id: number;
    username: string;
    displayName: string;
}

const mockUsers : User[] = [
    {id: 1, username: 'anson', displayName: 'Anson'},
    {id: 2, username: 'bob', displayName: 'Bob'},
    {id: 3, username: 'charlie', displayName: 'Charlie'},
    {id: 4, username: 'jane', displayName: 'Jane'},
];


app.get('/', (req: Request, res: Response) => {
    res.send(mockUsers);
});

app.get('/api/users/:id', (req: Request, res: Response) => {
    const parseId = parseInt(req.params.id);
    const user = mockUsers.find((user) => user.id === parseId);
    
    if (user) {
        return res.send(user);
    }else {
        return res.status(404).send('User not found');
    }
});

app.get('/api/users', (req: Request, res: Response) => {
    console.log(req.query);
    const {filter, value} = req.query as {filter: string, value: string};
    
    // when filter and value are undefined it'll return all users if both are then it returns the filtered users and their values
    if (!filter && !value) {
        res.send(mockUsers).status(200);
    }else {
        res.send(mockUsers.filter((user) => {
            const filterType = filter as keyof typeof user;

            // if filter type is username then it'll return the filtered users and their values and if it's displayName then it'll return the filtered users and their displayNames and if it's a number then it'll return the filtered users and their ids
            if (filterType === 'username' || filterType === 'displayName' || filterType === 'id') {
                return user[ filterType].toString().includes(value);
            }
        }));
    }
});

app.post('/api/users', (req: Request, res: Response) => {
    // Creating a new user 
    const newUser: User = {
        id: mockUsers.length + 1,
        username: req.body.username,
        displayName: req.body.displayName,
    };
    // Pushing the new user to the mockUsers array
        mockUsers.push(newUser);
            // Sending the new user as a response   
                res.json(newUser).status(201);
                    // Logging the new user
                        console.log(newUser);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});