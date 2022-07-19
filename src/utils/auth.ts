import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';


export const verifyAuthToken = (req : Request, res : Response, next : NextFunction) : void | boolean => {

    if (!req.headers.authorization) {
        res.status(401)
        res.json("Access denied, invalid token")
    
        return false
    }

    try {

        const token = req.headers.authorization.split(" ")[1];

        jsonwebtoken.verify(token, process.env.TOKEN_SECRET as string);

        next();

    } catch (error) {

        res.status(401);
        res.json(`Access denied, invalid token`);
        return false;

    }

}