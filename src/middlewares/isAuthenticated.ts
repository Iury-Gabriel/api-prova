import { Request, Response, NextFunction } from "express";

import * as jwt from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            errorCode: "token.invalid"
        })
    }

    console.log(authToken)

    const [token] = authToken.split(",");

    try {
        const { sub } = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
        
        req.userId = sub

        return next();
    } catch (error) {
        return res.status(401).json({
            errorCode: "token.expired"
        })
    }
}