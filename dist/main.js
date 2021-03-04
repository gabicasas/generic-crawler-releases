"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '.env' });
const core_1 = require("@nestjs/core");
const cloud_config_client_1 = __importDefault(require("cloud-config-client"));
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
const config_1 = require("./config");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('Main');
const port = process.env.NODE_SERVER_PORT || config_1.config.get('server.port');
const useJHipsterRegistry = config_1.config.get('eureka.client.enabled');
async function bootstrap() {
    loadCloudConfig();
    registerAsEurekaService();
    const appOptions = { cors: true };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, appOptions);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: () => new common_1.BadRequestException('Validation error'),
    }));
    logger.log('The client is not been generated');
    swagger_1.setupSwagger(app);
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
async function loadCloudConfig() {
    if (useJHipsterRegistry) {
        const endpoint = config_1.config.get('cloud.config.uri') || 'http://admin:admin@localhost:8761/config';
        logger.log(`Loading cloud config from ${endpoint}`);
        const cloudConfig = await cloud_config_client_1.default.load({
            context: process.env,
            endpoint,
            name: config_1.config.get('cloud.config.name'),
            profiles: config_1.config.get('cloud.config.profile') || ['prod'],
            label: config_1.config.get('cloud.config.label') || 'main'
            // auth: {
            //   user: config.get('jhipster.registry.username') || 'admin',
            //   pass: config.get('jhipster.registry.password') || 'admin'
            // }
        });
        config_1.config.addAll(cloudConfig.properties);
    }
}
function registerAsEurekaService() {
    if (useJHipsterRegistry) {
        logger.log(`Registering with eureka ${config_1.config.get('eureka.client.service-url.defaultZone')}`);
        const Eureka = require('eureka-js-client').Eureka;
        const eurekaUrl = require('url').parse(config_1.config.get('eureka.client.service-url.defaultZone'));
        const client = new Eureka({
            instance: {
                app: config_1.config.get('eureka.instance.appname'),
                instanceId: config_1.config.get('eureka.instance.instanceId'),
                hostName: config_1.config.get('ipAddress') || 'localhost',
                ipAddr: config_1.config.get('ipAddress') || '127.0.0.1',
                status: 'UP',
                port: {
                    '$': port,
                    '@enabled': 'true',
                },
                vipAddress: config_1.config.get('ipAddress') || 'localhost',
                homePageUrl: `http://${config_1.config.get('ipAddress')}:${port}/`,
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    'name': 'MyOwn',
                },
            },
            eureka: {
                // eureka server host / port
                host: eurekaUrl.hostname || '127.0.0.1',
                port: eurekaUrl.port || 8761,
                servicePath: '/eureka/apps',
            },
            requestMiddleware: (requestOpts, done) => {
                requestOpts.auth = {
                    user: config_1.config.get('jhipster.registry.username') || 'admin',
                    password: config_1.config.get('jhipster.registry.password') || 'admin',
                };
                done(requestOpts);
            },
        });
        client.logger.level('debug');
        client.start(error => logger.log(error || 'Eureka registration complete'));
    }
}
bootstrap();
//# sourceMappingURL=main.js.map