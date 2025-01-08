import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from 'src/entity/credential.entity';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  controllers: [CredentialController],
  providers: [CredentialService],
})
export class CredentialModule {}
