import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";


export class AuthService {

  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email});

    if (existUser) throw CustomError.badRequest('Email existente');


    try {
      const user = new UserModel(registerUserDto)
      await user.save();

      return user;
      
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }

}