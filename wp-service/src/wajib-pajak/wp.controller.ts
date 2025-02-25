import { Controller, Post, Body, Get, Request, Patch, Param } from "@nestjs/common";
import { WajibPajakService } from "./wp.service";
import { CreateWpDto } from "./dto/cr-wp.dto";
import { UpdateWpDto } from "./dto/up-wp.dto";

@Controller('wajib-pajak')
export class WajibPajakController {
    constructor(private readonly wpService: WajibPajakService) {}

    @Get(':npwp')
    async findByNpwp(@Request() req, @Param('npwp') npwp: string) {
        return this.wpService.findByNpwp(npwp);
    }

    @Post()
    async create(@Body() data: CreateWpDto) {
        return this.wpService.create(data);
    }

    @Patch()
    async update(@Body() data: UpdateWpDto) {
        return this.wpService.update(data);
    }

}
