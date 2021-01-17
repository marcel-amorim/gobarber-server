import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import updloadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepositories';
import IStorageProvider from '@shared/provider/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    // validations
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only autheticated users can change avatar.');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
