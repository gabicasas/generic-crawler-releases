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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const MarketHistory_schema_1 = require("../../schemas/MarketHistory.schema");
const git_service_1 = require("../git/git.service");
let CodeHandlerService = class CodeHandlerService {
    constructor(
    /*@InjectRepository(Post, 'mongo') private postRepository: Repository<Post>,*/
    marketHRepository, gitService) {
        this.marketHRepository = marketHRepository;
        this.gitService = gitService;
        /**
         * associative object that contains
         *  {
         *      url1: code1,
         *      url2: code2,
         *      . . .
         *  }
         */
        this.codeMappersUrl = {};
        console.log("here");
    }
    async obtainFirstNavigation(url) {
        let data = await this.gitService.getNavigation(url);
        return data;
    }
    //Debe normalizar el dato (funcionará distinto en cada micro)
    normalizeData(data) {
        return JSON.parse(data);
    }
    async processData(dataNormalized, url) {
        try {
            // let codeStr: string = await this.gitService.getMappers(url);
            let codeStr = this.codeMappersUrl[url];
            if (!codeStr) {
                codeStr = await this.gitService.getMappers(url);
                this.codeMappersUrl[url] = codeStr;
            }
            eval(codeStr);
        }
        catch (e) {
            console.error(e);
        }
    }
};
CodeHandlerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(MarketHistory_schema_1.MarketHistory, 'mongo')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        git_service_1.GitService])
], CodeHandlerService);
exports.CodeHandlerService = CodeHandlerService;
//# sourceMappingURL=code-handler.service.js.map