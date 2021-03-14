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
const Crawler_schema_1 = require("../../schemas/Crawler.schema");
const typeorm_2 = require("typeorm");
let GitService = class GitService {
    constructor(httpService, crawlerRepository) {
        this.httpService = httpService;
        this.crawlerRepository = crawlerRepository;
    }
    /**
     * devuelve una funcion Ts para ser ejecutada y hacer el mapper del
     * modelo de scrapping al modelo normalizado de un repo git
     * El repo git será el mismo que el de configuracion de spring cloud config
     * Este sirve los ficheros en modo texto a traves de las uris
     * http://server/{idMicro}/{entorno test,dev,pro..}/{git_branch}/{filename}
     * http://localhost:8888/servicio-item/prod/main/application.yml
    **/
    /*
    @todo: Solo implementado el happy path, falta exceptin en peticin de red y si la consulta no devuelve info
    */
    async getMappers(url) {
        let crawlers = await this.crawlerRepository.find({ url: url });
        let resultRequest = await this.httpService.get(crawlers[0].mapperUrl, { responseType: 'text', transformResponse: undefined });
        let aux = await resultRequest.toPromise();
        return aux.data;
    }
    /*
  @todo: Solo implementado el happy path, falta exceptin en peticin de red y si la consulta no devuelve info
  */
    async getNavigation(url) {
        let crawlers = await this.crawlerRepository.find({ url: url });
        if (crawlers.length != 1)
            throw new Error(JSON.stringify({ 'error': 'Navigation Not Found', 'url': url }));
        let result = await this.httpService.get(crawlers[0].navigationUrl, { responseType: 'text', transformResponse: undefined });
        return (await (result.toPromise())).data;
    }
};
GitService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(Crawler_schema_1.Crawler, 'mongo')),
    __metadata("design:paramtypes", [common_1.HttpService,
        typeorm_2.Repository])
], GitService);
exports.GitService = GitService;
//# sourceMappingURL=git.service.js.map