import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from './record';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  sex: string;

  @Column({ type: 'varchar', nullable: true })
  class: string;

  @OneToMany(() => Record, (r) => r.student)
  records?: Record[];
}

export default Student;
