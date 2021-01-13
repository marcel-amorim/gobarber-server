import User from '@modules/users/entities/User';

class Appointment {
  id: string;

  provider_id: string;

  provider: User;

  date: Date;

  created_at: Date;

  updated_at: Date;
}

export default Appointment;
