import { v4 } from 'uuid';
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';
import FakeAppointment from '@modules/appointments/entities/fakes/FakeAppointment';
import IAppointmentsRepository from '../IAppointmentsRepository';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: FakeAppointment[] = [];

  public async create({
    provider_id,
    date,
  }: iCreateAppointmentDTO): Promise<FakeAppointment> {
    const appointment = new FakeAppointment();
    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<FakeAppointment> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }
}

export default FakeAppointmentsRepository;
