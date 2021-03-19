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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const code_handler_service_1 = require("./code-handler/code-handler.service");
let PuppeteerService = class PuppeteerService {
    constructor(codeHandlerService) {
        this.logger = new common_1.Logger('PuppeteerService');
        this.codeHandlerService = codeHandlerService;
        console.log("here");
        //this.executeCrawling('http://www.visualeconomy.com/');
        (async () => {
            this.browser = await puppeteer_core_1.default.launch({
                //executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
                //executablePath: '"C:/Program Files/Google/Chrome/Application/chrome.exe"',
                headless: true,
                devtools: true,
                executablePath: process.env.CHROMIUM_PATH,
                args: ['--no-sandbox', '--remote-debugging-port=9222'],
            });
            if (process.env.URL_TO_CRAW) {
                this.executeCrawling(process.env.URL_TO_CRAW);
            }
        })();
    }
    async executeCrawling(url) {
        this.logger.log("executeCrawling");
        this.page = await this.browser.newPage();
        this.page.setDefaultNavigationTimeout(0); //desactiva el timeout de 30 segundos (valor en milliseconds)
        await this.page.goto(url);
        //todo: ejecutar navigacion a medida hasta pagina que devuelve la info
        try {
            let code = await this.codeHandlerService.obtainFirstNavigation(url);
            this.logger.log("Creando funcion");
            var handler = new Function('page', code);
            //eval("debugger;console.log('in eval');var executor=async function(){\ndebugger;\n await page.waitForSelector('#aaaa')};\n\nawait page.goto('https://www.google.es');");
            await handler(this.page); //invoke the function using arguments
        }
        catch (e) {
            this.logger.error('Error en obtainFirstNavigation', e);
            throw e;
        }
        await this.page.on('response', async (resp) => {
            // var header = resp.headers();
            //resp.text().then(result => {
            // todo:  save respose AJAX in mongo
            //  console.log(result);
            //})
            console.log('--------------------' + resp.url());
            let data = await resp.text();
            try {
                let dataNormalized = this.codeHandlerService.normalizeData(data);
                await this.codeHandlerService.processData(dataNormalized, url);
            }
            catch (e) {
                // console.error(e);
            }
        });
        const client = await this.page.target().createCDPSession();
        await client.send('Network.enable');
        client.on('Network.webSocketCreated', ({ requestId, url }) => {
            console.log('Network.webSocketCreated', requestId, url);
        });
        client.on('Network.webSocketClosed', ({ requestId, timestamp }) => {
            console.log('Network.webSocketClosed', requestId, timestamp);
        });
        client.on('Network.webSocketFrameSent', ({ requestId, timestamp, response }) => {
            console.log('Network.webSocketFrameSent', requestId, timestamp, response.payloadData);
        });
        client.on('Network.webSocketFrameReceived', ({ requestId, timestamp, response }) => {
            console.log('Network.webSocketFrameReceived', requestId, timestamp, response.payloadData);
        });
        return 'localhost:9222/json';
    }
    async stopCrawling() {
        this.page.close();
    }
};
PuppeteerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [code_handler_service_1.CodeHandlerService])
], PuppeteerService);
exports.PuppeteerService = PuppeteerService;
;
//# sourceMappingURL=puppeteer.service.js.map