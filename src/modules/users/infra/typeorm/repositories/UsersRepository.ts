import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import { getRepository, Repository } from 'typeorm';
import UserOrm from '../entities/UserOrm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<UserOrm>;

  constructor() {
    this.ormRepository = getRepository(UserOrm);
  }

  public async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
