import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

/**
 * Repository
 * É uma camada entre a aplicação e a fonte de dados (bd, file system, etc.).
 * Isola a comunicação com o banco de dados e abstrai lógicas comuns.
 * Geralmente, contém o CRUD comum, mas pode conter outros métodos também.
 */

/**
 * Don't Repeat Yourself (DRY)
 * Quando precisamos realizar alguma operação no banco mais de uma vez no app,
 * não precisamos repetir a lógica, basta usar o repositório (reaproveitamento).
 * O DRY não se refere a não-repetição de código, mas sim a não-repetição de
 * regras de negócio (por isso Services e Repositories).
 */

/**
 * Uma coisa importante pra destacar sobre interfaces e tipos, é que não é bom
 * modularizar tudo, porque às vezes é muito específico de um componente e se
 * precisar mudar, mas estiver usando em outro, vai topar com a interdependencia,
 * ou seja, se mudar em um, quebra outro, ai tem que ajustar, etc.
 * As vezes, é melhor deixar no próprio arquivo e tá tudo bem
 */

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}
