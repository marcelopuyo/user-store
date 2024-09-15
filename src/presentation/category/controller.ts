import { Request, Response } from 'express';
import {
  CreateCategoryDto,
  CustomError,
  LoginUserDto,
  PaginationDto,
  RegisterUserDto,
} from '../../domain';
import { CategoryService } from '../services';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
      console.log(error);
    }
  };

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));

  };

  getCategory = async (req: Request, res: Response) => {

    const { page = 1, limit = 10} = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.categoryService
    .getCategory(paginationDto!)
    .then((categories) => res.status(201).json(categories))
    .catch((error) => this.handleError(error, res));
  };
}
