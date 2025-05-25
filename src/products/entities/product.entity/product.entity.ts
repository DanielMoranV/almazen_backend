import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CompanyEntity } from '../../../companies/entities/company.entity/company.entity';
import { UnitEntity } from '../../../units/entities/unit.entity/unit.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  barcode?: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  sku?: string;

  @Column({ type: 'varchar', nullable: true })
  type_barcode?: string;

  @Column({ type: 'varchar', nullable: true })
  image_url?: string;

  @Column({ type: 'varchar', nullable: true })
  brand?: string;

  @Column({ type: 'varchar', nullable: true })
  presentation?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @Column({ type: 'uuid', name: 'company_id' })
  company_id: string;

  @ManyToOne(() => UnitEntity)
  @JoinColumn({ name: 'unit_id' })
  unit: UnitEntity;

  @Column({ type: 'integer', name: 'unit_id' })
  unit_id: number;
}
