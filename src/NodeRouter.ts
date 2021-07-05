import express, { NextFunction, Request, Response } from "express";
import { EmployeeRouter } from './Routes/EmployeeRouter';
import { StudentRouter } from './Routes/StudentRouter';

export const NodeRouter = () => {
    let expressRouter = express.Router();

    // expressRouter.use('/', (req: Request, res: Response, next: NextFunction) => {
    //     console.log('all middleware called', req);
    //     next();
    // });
    expressRouter = EmployeeRouter(expressRouter)
    expressRouter = StudentRouter(expressRouter)

    return expressRouter;
}

