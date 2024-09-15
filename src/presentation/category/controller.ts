import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";


export class CategoryController {

  constructor() {};

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message});
    } else {
      return res.status(500).json({error: 'Internal server error'});
      console.log(error);
    };
  };

  createCategory = async(req: Request, res: Response) => {
    res.json('Categoria creada');
  }
  
  getCategory = async(req: Request, res: Response) => {
    res.json('Get categories');
  }
  
}