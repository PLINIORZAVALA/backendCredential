import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from 'src/entity/credential.entity';
import { CreateCredentialDto } from 'src/dtos/create-credential.dto';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    const newCredential = this.credentialRepository.create({
      id: createCredentialDto.id || `http://universidad.ejemplo/credenciales/${Math.random().toString(36).substring(2, 8)}`,
      ...createCredentialDto,
      validFrom: new Date(createCredentialDto.validFrom),
      validUntil: createCredentialDto.validUntil ? new Date(createCredentialDto.validUntil) : null,
    });

    return this.credentialRepository.save(newCredential); // Guarda en la base de datos
  }

  async findById(id: string): Promise<Credential> {
    const credential = await this.credentialRepository.findOne({ where: { id } });
    if (!credential) {
      throw new NotFoundException('Credencial no encontrada');
    }
    return credential;
  }

  async findAll(): Promise<Credential[]> {
    return this.credentialRepository.find();
  }

  async verify(id: string): Promise<{ id: string; isValid: boolean }> {
    const credential = await this.findById(id);
    const now = new Date();
    const isValid =
      now >= credential.validFrom &&
      (!credential.validUntil || now <= credential.validUntil);

    return {
      id: credential.id,
      isValid,
    };
  }
}
