import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from 'src/dtos/create-credential.dto';
import { VerifyCredentialDto } from 'src/dtos/verify-credential.dto'; 
@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialService.create(createCredentialDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.credentialService.findById(id);
  }

  @Post('verify')
  verify(@Body() verifyCredentialDto: VerifyCredentialDto) {
    return this.credentialService.verify(verifyCredentialDto.id);
  }

  @Get()
  findAll() {
    return this.credentialService.findAll();
  }
}
