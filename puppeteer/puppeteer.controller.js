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
//@UseInterceptors(LoggingInterceptor) Ver pq no funciona
class PuppeteerController {
    constructor(puppeteerService) {
        this.puppeteerService = puppeteerService;
    }
    test(url = 'http://www.visualeconomy.com/') {
        this.puppeteerService.executeCrawling(url);
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
    common_1.Get('test/:url'),
    __param(0, common_1.Param('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PuppeteerController.prototype, "test", null);
PuppeteerController = __decorate([
    common_1.Controller('puppeteer'),
    swagger_1.ApiUseTags('PuppeteerCrawler')
    //@UseInterceptors(LoggingInterceptor) Ver pq no funciona
    ,
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService])
], PuppeteerController);
exports.PuppeteerController = PuppeteerController;
//# sourceMappingURL=puppeteer.controller.js.map