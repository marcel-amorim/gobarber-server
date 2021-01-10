import IUser from '@modules/users/entities/IUser';

export default interface IAppointments {
  id: string;
  provider_id: string;
  provider: IUser;
  date: Date;
  created_at: Date;
  updated_at: Date;
}
