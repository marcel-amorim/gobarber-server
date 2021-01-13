import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/entities/Appointment';
import AppointmentOrm from '@modules/appointments/infra/typeorm/entities/AppointmentOrm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<AppointmentOrm>;

  constructor() {
    this.ormRepository = getRepository(AppointmentOrm);
  }

  public async create({
    provider_id,
    date,
  }: iCreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentInSameDate = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointmentInSameDate;
  }
}

export default AppointmentsRepository;
