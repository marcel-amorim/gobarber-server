import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import updloadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUser from '../entities/IUser';
import IUsersRepository from '../repositories/IUsersRepositories';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<IUser> {
    // validations
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only autheticated users can change avatar.');
    }

    if (user.avatar) {
      // delete previous avatar

      const userAvatarFilePath = path.join(
        updloadConfig.directory,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
