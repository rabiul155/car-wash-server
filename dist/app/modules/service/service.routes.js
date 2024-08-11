"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const service_validate_1 = __importDefault(require("./service.validate"));
const service_controllers_1 = require("./service.controllers");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router
    .route('/')
    .get(service_controllers_1.serviceControllers.getAllServices)
    .post(auth_1.authenticate, (0, auth_1.authorization)('admin'), (0, validateRequest_1.default)(service_validate_1.default), service_controllers_1.serviceControllers.createService);
router
    .route('/:id')
    .get(service_controllers_1.serviceControllers.getServices)
    .put(auth_1.authenticate, (0, auth_1.authorization)('admin'), (0, validateRequest_1.default)(service_validate_1.default.partial()), service_controllers_1.serviceControllers.updateServices)
    .delete(auth_1.authenticate, (0, auth_1.authorization)('admin'), service_controllers_1.serviceControllers.deleteServices);
exports.serviceRoutes = router;
