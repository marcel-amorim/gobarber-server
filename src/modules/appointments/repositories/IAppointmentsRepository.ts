import ICreateAppointmentDTO from '../dtos/iCreateAppointmentDTO';
import IAppointment from '../entities/IAppointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<IAppointment>;
  findByDate(date: Date): Promise<IAppointment | undefined>;
}
