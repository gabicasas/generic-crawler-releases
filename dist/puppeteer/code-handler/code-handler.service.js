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
const Post_schema_1 = require("../../schemas/Post.schema");
const typeorm_2 = require("typeorm");
const MarketHistory_schema_1 = require("../../schemas/MarketHistory.schema");
const git_service_1 = require("../git/git.service");
let CodeHandlerService = class CodeHandlerService {
    // private crawConfigModel: Model<CrawConfigDocument>;
    /* constructor( @InjectRepository(Post)
     private postRepository: Repository<Post>){ }
 */
    constructor(postRepository, marketHRepository, gitService
    /*, @InjectRepository(PostRepository) private postRepository: Repository<PostRepository>*/ ) {
        this.postRepository = postRepository;
        this.marketHRepository = marketHRepository;
        this.gitService = gitService;
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
        let codeStr = await this.gitService.getMappers(url);
        console.log(codeStr);
        try {
            eval(codeStr);
        }
        catch (e) {
            console.error(e);
        }
        // if(Array.isArray(dataNormalized) && dataNormalized.length>0 && dataNormalized[0].marketId){
        //console.log("mercados"); 
        /*********Esto va a un mapper que será codigo personalizado *********** */
        /*  for(let i in dataNormalized){
              let mh: MarketHistory = new MarketHistory();
              mh.marketId=dataNormalized[i].marketId;
              mh.marketStatus=dataNormalized[i].marketStatus;
              mh.timestamp=new Date();
              mh.runnerDetails=[];
              let runnerDetails: any[] =dataNormalized[i].runnerDetails;
              runnerDetails.forEach(runnerDetail => {
                  let rDetail: RunnerDetail = new RunnerDetail();
                  rDetail.runnerStatus = runnerDetail.runnerStatus;
                  rDetail.selectionId = runnerDetail.selectionId;
                  //No estoy seguro que esta cuota sea correcta
                  rDetail.quota = runnerDetail.runnerOdds.trueOdds.decimalOdds.decimalOdds;
                  mh.runnerDetails.push(rDetail);
               });
               */
        /* ******************************************************************* */
        //         this.marketHRepository.save(mh).then(result => {/* console.log("Saved")*/;});
        //     } 
        //    }
    }
};
CodeHandlerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Post_schema_1.Post, 'mongo')),
    __param(1, typeorm_1.InjectRepository(MarketHistory_schema_1.MarketHistory, 'mongo')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        git_service_1.GitService
        /*, @InjectRepository(PostRepository) private postRepository: Repository<PostRepository>*/ ])
], CodeHandlerService);
exports.CodeHandlerService = CodeHandlerService;
//# sourceMappingURL=code-handler.service.js.map