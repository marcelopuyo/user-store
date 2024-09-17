import { validators } from "../../../config";


export class CreateProductDto {

  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateProductDto?] {

    const { name, available, price, description, user, category } = props;
    let availableBoolean = available;

    if (!name) return ['Se esperaba nombre'];

    if (!user) return ['Se esperaba usuario'];
    if (!validators.isMongoID(user)) return ['ID de usuario invalido'];

    if (!category) return ['Se esperaba categoria'];
    if (!validators.isMongoID(category)) return ['ID de categoria invalido'];

    
    // if (typeof available !== 'boolean') {
    //   availableBoolean = (available === 'true');
    // }

    return [undefined, new CreateProductDto(name, !!available, price, description, user, category)];
  }



}