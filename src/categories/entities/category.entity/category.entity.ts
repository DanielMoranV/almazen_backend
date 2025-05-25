import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CompanyEntity } from '../../../companies/entities/company.entity/company.entity';
// Note: CategoryCompanyEntity is implicitly used via JoinTable, direct import not strictly needed for this setup.

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => CompanyEntity)
  @JoinTable({
    name: 'category_company', // Junction table name
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'company_id', referencedColumnName: 'id' },
  })
  companies: CompanyEntity[];
}
