import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from 'src/dtos/create-credential.dto';
import { VerifyCredentialDto } from 'src/dtos/verify-credential.dto';

@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  async create(@Body() createCredentialDto: CreateCredentialDto) {
    return await this.credentialService.create(createCredentialDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.credentialService.findById(id);
  }

  @Post('verify')
  async verify(@Body() verifyCredentialDto: VerifyCredentialDto) {
    return await this.credentialService.verify(verifyCredentialDto.id);
  }

  @Get()
  async findAll() {
    return await this.credentialService.findAll();
  }
}
