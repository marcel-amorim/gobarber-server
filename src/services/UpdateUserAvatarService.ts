import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import updloadConfig from '../config/upload';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // validations
    const user = await usersRepository.findOne(user_id);

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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
