import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // Omit serve pra quando eu quiser omitir uma propriedade do tipo/interface
  // por exemplo, o id não precisa ser informado
  // porque vai ser criado automaticamente, portanto usa-se o imit
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }

  // removemos o constructor pra trabalhar com TypeORM porque ele gera um automaticamente
}

export default Appointment;
