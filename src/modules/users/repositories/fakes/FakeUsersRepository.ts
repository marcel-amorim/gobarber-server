import { v4 } from 'uuid';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: v4(), ...data });

    this.users.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
