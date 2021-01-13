import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

describe('CreateUserService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeAppointmentsRepository);

    const appointment = await createUser.execute({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: 'jo101112',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create same email', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeAppointmentsRepository);

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
