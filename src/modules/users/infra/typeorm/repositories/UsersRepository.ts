import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUser from '@modules/users/entities/IUser';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<IUser> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<IUser> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: IUser): Promise<IUser> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
