import 'reflect-metadata';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: 'jo101112',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: 'jo101112',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non-existent user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    const response = authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: 'jo101112',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: 'jo101112',
    });

    const response = authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: 'wrong password',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });
});
