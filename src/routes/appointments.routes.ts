import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

/**
 * Separation of Concerns (SoC): Separação de Preocupações
 * No caso, é separar as responsabilidades de cada coisa.
 * Aqui, a rota estava fazendo muito mais coisa do que só manipular request e response,
 * estava filtrando, fazendo if, entre outras coisas. Portanto, pra casos assim,
 * separamos em arquivos como models, repository e services
 *
 * Regra de negócio não pode estar aqui.
 * Caso seja uma transformação de dados (ex: parsedDate) ai não tem problema
 *
 * Função da Rota: receber a requisição, chamar outro arquivo pra tratar essa questão
 * e devolver uma resposta
 */

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error: unknown ) {
    return response.status(400).json({ error });
  }
});

export default appointmentsRouter;
