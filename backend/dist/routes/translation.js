"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TranslationController_1 = __importDefault(require("../controllers/TranslationController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', TranslationController_1.default.show);
router.post('/', TranslationController_1.default.create);
router.patch('/', TranslationController_1.default.update);
router.delete('/', TranslationController_1.default.delete);
exports.default = router;
