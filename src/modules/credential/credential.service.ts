import { Injectable, NotFoundException } from '@nestjs/common';
import { Credential } from 'src/entity/credential.entity';
import { CreateCredentialDto } from 'src/dtos/create-credential.dto';

@Injectable()
export class CredentialService {
  private credentials: Credential[] = [];

  create(createCredentialDto: CreateCredentialDto): Credential {
    const newCredential: Credential = {
      id: `http://universidad.ejemplo/credenciales/${Math.random().toString(36).substring(2, 8)}`,
      ...createCredentialDto,
      validFrom: new Date(createCredentialDto.validFrom),
      validUntil: createCredentialDto.validUntil ? new Date(createCredentialDto.validUntil) : undefined,
    };

    this.credentials.push(newCredential);
    return newCredential;
  }

  findById(id: string): Credential {
    const credential = this.credentials.find((cred) => cred.id === id);
    if (!credential) {
      throw new NotFoundException('Credencial no encontrada');
    }
    return credential;
  }

  verify(id: string): { id: string; isValid: boolean } {
    const credential = this.findById(id);
    const now = new Date();
    const isValid =
      now >= credential.validFrom && (!credential.validUntil || now <= credential.validUntil);

    return {
      id: credential.id,
      isValid,
    };
  }

  findAll(): Credential[] {
    return this.credentials;
  }
}
