import IUser from '@modules/users/entities/IUser';
import IAppointment from '../IAppointment';

class FakeAppointment implements IAppointment {
  id: string;
  provider_id: string;
  provider: IUser;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export default FakeAppointment;
