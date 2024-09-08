"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const slot_validate_1 = __importDefault(require("./slot.validate"));
const slot_controllers_1 = require("./slot.controllers");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.authenticate, (0, auth_1.authorization)('admin'), (0, validateRequest_1.default)(slot_validate_1.default), slot_controllers_1.slotController.createSlot);
router.get('/', slot_controllers_1.slotController.getSlots);
router.get('/availability', slot_controllers_1.slotController.getAvailableSlot);
exports.slotRoutes = router;
