"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../domain/user.entity");
const user_dto_1 = require("../dto/user.dto");
/**
 * An User mapper object.
 */
class UserMapper {
    static fromDTOtoEntity(userDTO) {
        if (!userDTO) {
            return;
        }
        const user = new user_entity_1.User();
        const fields = Object.getOwnPropertyNames(userDTO);
        fields.forEach(field => {
            user[field] = userDTO[field];
        });
        return user;
    }
    static fromEntityToDTO(user) {
        if (!user) {
            return;
        }
        const userDTO = new user_dto_1.UserDTO();
        const fields = Object.getOwnPropertyNames(user);
        fields.forEach(field => {
            userDTO[field] = user[field];
        });
        return userDTO;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map