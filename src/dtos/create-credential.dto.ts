import { IsNotEmpty, IsOptional, IsString, IsDateString, IsArray } from 'class-validator';

export class CreateCredentialDto {
  @IsString()
  @IsOptional() // Opcional si no deseas que se proporcione siempre
  id?: string;

  @IsArray()
  @IsNotEmpty()
  contexto: string[];

  @IsArray()
  @IsNotEmpty()
  tipo: string[];

  @IsString()
  @IsNotEmpty()
  emisor: string;

  @IsDateString()
  @IsNotEmpty()
  validFrom: string;

  @IsDateString()
  @IsOptional()
  validUntil?: string;

  @IsNotEmpty()
  asuntoCredencial: {
    id: string;
    exalumnoDe: {
      id: string;
      nombre: string;
    };
  };
}
