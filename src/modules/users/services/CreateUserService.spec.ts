import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: 'jo101112',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create same email', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: 'jo101112',
    });

    const sameEmailUser = createUser.execute({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: 'jo101112',
    });

    expect(sameEmailUser).rejects.toBeInstanceOf(AppError);
  });
});
