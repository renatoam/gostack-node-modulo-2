import startOfHour from 'date-fns/startOfHour';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * Service (Service Pattern)
 * Tem como função abstrair regras de negócio das rotas,
 * além de tornar nosso código mais reutilizável.
 * Service não tem acesso ao parametros de request e response.
 * O Service pode ter apenas um método.
 */

/**
 * Don't Repeat Yourself (DRY)
 * No caso de alguma outra rota ou o que seja, precisar criar um outro
 * agendamento, para não ter que repetir a lógica de criação de agendamento,
 * usamos este Service.
 * O DRY não se refere a não-repetição de código, mas sim a não-repetição de
 * regras de negócio (por isso Services e Repositories).
 */

/**
 * Single Responsability (SOLID)
 * Esse princípio zela que uma classe deve possuir apenas uma responsabilidade.
 * Ao criar um service chamado CreateAppointmentService, devemos garantir que
 * no seu único método (execute()) seu trabalho seja apenas a criação de um appointment
 */

/**
 * Dependency Inversion (SOLID)
 * Esse princípio zela que uma entidade dependa apenas de abstrações, não de implementações.
 *
 * O AppointmentsRepository é instanciado usando "new", porém se fizermos isso
 * em mais de um lugar, estaremos falando de repositórios (appointments[]) diferentes
 *
 * Nesse caso, passamos o repositório como parâmetro no constructor do Service,
 * ou seja, dentro do Service, estamos trabalhando somente com a abstração
 * e não com o repositório propriamente dito. Então sempre que chamarmos o Service
 * passamos o repositório desejado como parâmetro.
 *
 * Estratégia que eu uso no front, mas não sabia o nome (pra consumir as APIs)
 */

/**
 * Data Transfer Object (DTO)
 * Quando trabalhamos com a transferencia de objetos entre arquivos,
 * usamos um DTO. No caso desse Service, essa Request é um DTO.
 * Não precisamos colocar DTO no nome, apenas entender
 */

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already taken!');

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
