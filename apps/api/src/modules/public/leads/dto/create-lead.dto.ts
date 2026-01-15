import { IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  productId!: string;

  @IsOptional()
  @IsString()
  customerName?: string;
}
