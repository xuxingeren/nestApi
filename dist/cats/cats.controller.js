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
let CatsController = class CatsController {
    getId(res, query) {
        if (query.id) {
            res.status(common_1.HttpStatus.OK).json({
                id: query.id,
                code: 200,
            });
        }
        else {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                msg: 'id没有传过来',
                code: 500,
            });
        }
    }
    setData(res, body) {
        res.status(common_1.HttpStatus.OK).json({
            user: body.user || 'test',
            password: body.password || 'password',
            code: 200,
        });
    }
};
__decorate([
    common_1.Get('getInfo'),
    __param(0, common_1.Response()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getId", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "setData", null);
CatsController = __decorate([
    common_1.Controller('fetch')
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map