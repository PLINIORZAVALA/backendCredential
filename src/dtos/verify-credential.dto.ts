import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCredentialDto {
  @IsString()
  @IsNotEmpty()
  id: string; // ID de la credencial a verificar
}
