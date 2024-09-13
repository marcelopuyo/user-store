import { Response } from "express";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { bcryptAdapter, JwtAdapter } from "../../config";


export class AuthService {

  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email});

    if (existUser) throw CustomError.badRequest('Email existente');


    try {
      const user = new UserModel(registerUserDto)

      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();



      const { password, ...userEntity} = UserEntity.fromObject(user);

      return {
        user: userEntity,
        token: 'aca va el token'
      };
      
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }

  public async loginUser(loginUserDto: LoginUserDto) {

    const user = await UserModel.findOne({ email: loginUserDto.email});

    if (!user) throw CustomError.badRequest('Usuario o contraseña erroneo');

    const compare = bcryptAdapter.compare(loginUserDto.password, user.password);

    if (compare) {
      const { password, ...userEntity} = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id});
      if (!token) throw CustomError.internalServer('Error al generar el jwt');

      return {
        user: userEntity,
        token: token
      };
    } else {
      throw CustomError.badRequest('Usuario o contraseña erroneo');
    };

  }

}