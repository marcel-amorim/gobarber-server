import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserOrm from '@modules/users/infra/typeorm/entities/UserOrm';
import Appointments from '@modules/appointments/entities/Appointment';

@Entity('appointments')
class AppointmentOrm extends Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => UserOrm)
  @JoinColumn({ name: 'provider_id' })
  provider: UserOrm;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentOrm;
