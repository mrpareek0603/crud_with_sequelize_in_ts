import express, { Application, Response, Request } from "express";

const User = require('./models').User;

// const user: any = User;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/user', async(req:Request, res:Response):Promise<Response> =>{
    try{
        const {firstName, lastName, email} = req.body;
        const data = {firstName, lastName, email};
        console.log(data)
        const created = await User.create({firstName, lastName, email});
        return res.status(200).json({msg:'created the user in db', created});
    } catch(error){
        console.log(`error is ${error}`);
        
        return res.status(500).json({msg:'some error occured while creating user, erros is:', error});    }
})

app.get('/user', async(req:Request, res:Response):Promise<Response> =>{
    try{
        const userData = await User.findAll();
        return res.status(200).json({msg:'got the user data', userData});
    } catch (err) {
        return res.status(500).json({msg:'some error occured while getting data from db!'});
    }
    // return User;
});

const port = 3009;

app.listen(port,()=>{
    console.log('Server running on port: '+ port);
})