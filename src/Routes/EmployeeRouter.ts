import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { RequestValidator } from '../Middlewares/RequestValidator';
import { EmployeeModel, IEmployee } from '../Models/Employee.mongoose';

export const EmployeeRouter = (router: core.Router) => {

    router
    .get("/emp", RequestValidator("/emp", true), (req: Request, res: Response) => {
        res.status(200).send("Hello from All Employees");
    })
    .post("/emp", RequestValidator("/emp", true) , (req: Request, res: Response) => {
        
        EmployeeModel.create(<IEmployee>{  FirstName: req.body.FirstName, LastName: req.body.LastName }, (err) =>{
            if(err)
                res.status(500).send(err.message);
            else
                res.status(200).send("Hello from One Employee");
        })
        
    });
    
    return router;
}
