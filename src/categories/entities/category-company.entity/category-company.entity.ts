import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyEntity } from '../../../companies/entities/company.entity/company.entity';
import { CategoryEntity } from '../category.entity/category.entity';

@Entity({ name: 'category_company' })
export class CategoryCompanyEntity {
  @PrimaryColumn({ type: 'uuid' })
  company_id: string;

  @PrimaryColumn({ type: 'int' })
  category_id: number;

  @ManyToOne(() => CompanyEntity, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
