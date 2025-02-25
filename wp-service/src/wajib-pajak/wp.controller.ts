import { Controller, Post, Body, Get, Request, Patch, Param } from "@nestjs/common";
import { WajibPajakService } from "./wp.service";

@Controller('wajib-pajak')
export class WajibPajakController {
    constructor(private readonly wpService: WajibPajakService) {}

    @Get(':npwp')
    async findByNpwp(@Request() req, @Param('npwp') npwp: string) {
        return this.wpService.findByNpwp(npwp);
    }

    @Post()
    async create(@Body() data) {
        return this.wpService.create(data);
    }

    @Patch('update')
    async update(@Body() data) {
        return this.wpService.update(data);
    }

}
