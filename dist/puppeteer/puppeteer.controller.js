"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const puppeteer_service_1 = require("./puppeteer.service");
/**
 * Controller that obtain custom code and do scraping from web
 */
let PuppeteerController = 
//@UseInterceptors(LoggingInterceptor) -- Ver pq no funciona
class PuppeteerController {
    constructor(puppeteerService) {
        this.logger = new common_1.Logger('PuppeteerController');
        this.puppeteerService = puppeteerService;
    }
    async start(url = 'http://www.visualeconomy.com/') {
        this.logger.log("start crawling={}", url);
        try {
            let result = await this.puppeteerService.executeCrawling(url);
            return result;
        }
        catch (e) {
            this.logger.error("ERROR={}", e);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: e.message,
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async startEnv() {
        this.logger.log("start crawling={}", process.env.URL_TO_CRAW);
        try {
            let result = await this.puppeteerService.executeCrawling(process.env.URL_TO_CRAW);
            return result;
        }
        catch (e) {
            this.logger.error("ERROR={}", e);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: e.message,
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async stop() {
        this.logger.log("stop crawling");
        try {
            await this.puppeteerService.stopCrawling();
        }
        catch (e) {
            this.logger.error("ERROR={}", e);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: e.message,
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
__decorate([
    swagger_1.ApiOperation({ title: 'Execute the AJAX crawling in url specified' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'undefined',
        type: 'string',
        isArray: true,
    }),
    common_1.Get('start/:url'),
    __param(0, common_1.Param('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "start", null);
__decorate([
    swagger_1.ApiOperation({ title: 'Execute the AJAX crawling in url specified in env URL_TO_CRAW' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'undefined',
        type: 'string',
        isArray: true,
    }),
    common_1.Get('start/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "startEnv", null);
__decorate([
    swagger_1.ApiOperation({ title: 'Stop the crawler' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'undefined',
        type: 'string',
        isArray: true,
    }),
    common_1.Get('stop'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "stop", null);
PuppeteerController = __decorate([
    common_1.Controller('puppeteer'),
    swagger_1.ApiUseTags('PuppeteerCrawler')
    //@UseInterceptors(LoggingInterceptor) -- Ver pq no funciona
    ,
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService])
], PuppeteerController);
exports.PuppeteerController = PuppeteerController;
//# sourceMappingURL=puppeteer.controller.js.map