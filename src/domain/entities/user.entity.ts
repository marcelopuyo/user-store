import { CustomError } from "../errors/custom.error";


export class UserEntity {

  constructor (
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string,

  ) {};

  static fromObject( object: {[key:string]: any}){
    const { id, _id, name, email, emailValidated, password, role, img} = object;

    if (!id && !_id) throw CustomError.badRequest('Se esperaba id');
    if (!name) throw CustomError.badRequest('Se esperaba nombre');
    if (!email) throw CustomError.badRequest('Se esperaba email');
    if (emailValidated === undefined) throw CustomError.badRequest('Se esperaba email validado');
    if (!password) throw CustomError.badRequest('Se esperaba password');
    if (!role) throw CustomError.badRequest('Se esperaba rol');

    return new UserEntity(_id || id, name, email, emailValidated, password, role, img);
    
  }


}