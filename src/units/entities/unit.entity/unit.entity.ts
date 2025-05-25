import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'units' })
export class UnitEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  symbol: string;
}
