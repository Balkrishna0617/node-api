import { Request, Response } from "express";
import * as core from 'express-serve-static-core';
export const StudentRouter = (router: core.Router) => {

    router
    .get("/std", (req: Request, res: Response) => {
        res.status(200).send("Hello from All Students");
        
    })
    .get("/std/:id", (req: Request, res: Response) => {
        res.status(200).send("Hello from One Student");
        return res;
    });
    
    return router;
}
