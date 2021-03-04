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
const authority_entity_1 = require("./authority.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const config_1 = require("../config");
const typeorm_encrypted_1 = require("typeorm-encrypted");
let User = class User extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "activated", void 0);
__decorate([
    typeorm_1.Column({ default: 'en' }),
    __metadata("design:type", String)
], User.prototype, "langKey", void 0);
__decorate([
    typeorm_1.ManyToMany(type => authority_entity_1.Authority),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "authorities", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        transformer: new typeorm_encrypted_1.EncryptionTransformer({
            key: config_1.config.get('crypto.key'),
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: config_1.config.get('crypto.iv'),
        }),
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "activationKey", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "resetKey", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "resetDate", void 0);
User = __decorate([
    typeorm_1.Entity('nhi_user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map