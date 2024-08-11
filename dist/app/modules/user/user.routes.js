"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_validate_1 = __importDefault(require("./user.validate"));
const user_controllers_1 = __importDefault(require("./user.controllers"));
const auth_controllers_1 = __importDefault(require("../auth/auth.controllers"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validate_1.default), auth_controllers_1.default.singUpUser);
router.post('/login', auth_controllers_1.default.logInUser);
router.route('/').get(user_controllers_1.default.getUsers);
exports.userRoutes = router;
