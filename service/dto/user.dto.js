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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
/**
 * An User DTO object.
 */
class UserDTO extends base_dto_1.BaseDTO {
}
__decorate([
    swagger_1.ApiModelProperty({ uniqueItems: true, example: 'myuser', description: 'User login' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDTO.prototype, "login", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyUser', description: 'User first name', required: false }),
    __metadata("design:type", String)
], UserDTO.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'MyUser', description: 'User last name', required: false }),
    __metadata("design:type", String)
], UserDTO.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'myuser@localhost.it', description: 'User email' }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'true', description: 'User activation', required: false }),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "activated", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'en', description: 'User language', required: false }),
    __metadata("design:type", String)
], UserDTO.prototype, "langKey", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        isArray: true,
        enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'],
        description: 'Array of permissions',
        required: false,
    }),
    __metadata("design:type", Array)
], UserDTO.prototype, "authorities", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'myuser', description: 'User password' }),
    __metadata("design:type", String)
], UserDTO.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'http://my-image-url', description: 'Image url', required: false }),
    __metadata("design:type", String)
], UserDTO.prototype, "imageUrl", void 0);
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map