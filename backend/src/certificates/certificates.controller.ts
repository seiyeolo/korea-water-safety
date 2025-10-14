import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.certificatesService.findByUserId(userId);
    }
    return this.certificatesService.findAll();
  }

  @Get('verify/:certificateNumber')
  findByNumber(@Param('certificateNumber') certificateNumber: string) {
    return this.certificatesService.findByNumber(certificateNumber);
  }

  @Get('lookup')
  findByUserInfo(
    @Query('name') name: string,
    @Query('birthDate') birthDate: string,
    @Query('phone') phone: string,
  ) {
    return this.certificatesService.findByUserInfo(name, birthDate, phone);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificatesService.update(id, updateCertificateDto);
  }

  @Patch(':id/revoke')
  @HttpCode(HttpStatus.OK)
  revoke(@Param('id') id: string) {
    return this.certificatesService.revoke(id);
  }

  @Post('check-expired')
  @HttpCode(HttpStatus.OK)
  async checkExpired() {
    const count = await this.certificatesService.checkExpired();
    return {
      message: `Updated ${count} expired certificates`,
      count,
    };
  }
}
