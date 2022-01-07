import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;

/**
 * Separation of Concerns (SoC)
 * Esse princípio zela pela separação de responsabilidades de cada arquivo.
 * Exemplo: as rotas não devem ser responsáveis por lidar com a persistência dos dados,
 * isso fica por conta do Repository.
 * Já o Repository não é responsável pela tratativa das regras de negócio,
 * isso é responsabilidade dos Services;
 */
