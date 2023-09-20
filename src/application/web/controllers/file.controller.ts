import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiTag, RoutePrefix } from 'src/application/enums';
import { ApiMimeType } from 'src/application/enums/api-mime-type.enum';
import { isRestaurantGuard } from 'src/common/guards';
import { FileService } from 'src/domain/services/file.service';
import { UploadImageDto } from '../dtos';

@ApiTags(ApiTag.WEB_FILES)
@ApiBearerAuth()
@Controller({
  path: `${RoutePrefix.WEB}/files`,
})
@UseGuards(isRestaurantGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload/image')
  @ApiConsumes(ApiMimeType.FORM_DATA)
  @FormDataRequest()
  upload(@Body() dto: UploadImageDto) {
    return this.fileService.uploadImage(dto);
  }
}
