import { Request, Response } from "express";



const ResetExamController = async (req: Request, res: Response) => {
    const { senha }: any = req.body;

    if (senha === '123456') {
        res.status(200).send({ restart: true });
    } else {
        res.status(401).send({ restart: false });
    }
}

export { ResetExamController }