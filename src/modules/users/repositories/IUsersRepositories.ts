import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUser from '../entities/IUser';

export default interface IUsersRepository {
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUserDTO): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
}
