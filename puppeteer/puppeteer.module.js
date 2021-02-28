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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const puppeteer_service_1 = require("./puppeteer.service");
const puppeteer_controller_1 = require("./puppeteer.controller");
const code_handler_service_1 = require("./code-handler/code-handler.service");
const typeorm_1 = require("@nestjs/typeorm");
//Cuidado en las importaciones que no ponga src
const Category_schema_1 = require("../schemas/Category.schema");
const post_repository_1 = require("../repository/post.repository");
const authority_repository_1 = require("../repository/authority.repository");
const MarketHistory_schema_1 = require("../schemas/MarketHistory.schema");
const git_service_1 = require("./git/git.service");
const Crawler_schema_1 = require("../schemas/Crawler.schema");
let PuppeteerModule = class PuppeteerModule {
    constructor() {
        console.log('Se ejecuta');
    }
};
PuppeteerModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule, typeorm_1.TypeOrmModule.forFeature([Crawler_schema_1.Crawler, Category_schema_1.Category, post_repository_1.PostRepository, MarketHistory_schema_1.MarketHistory], 'mongo'),
            typeorm_1.TypeOrmModule.forFeature([authority_repository_1.AuthorityRepository])],
        providers: [puppeteer_service_1.PuppeteerService, code_handler_service_1.CodeHandlerService, git_service_1.GitService],
        controllers: [puppeteer_controller_1.PuppeteerController]
    }),
    __metadata("design:paramtypes", [])
], PuppeteerModule);
exports.PuppeteerModule = PuppeteerModule;
//# sourceMappingURL=puppeteer.module.js.map