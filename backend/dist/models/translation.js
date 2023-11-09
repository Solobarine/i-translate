"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    English: {
        type: String,
        lowercase: true,
        required: false,
        trim: true,
        default: ''
    },
    French: {
        type: String,
        lowercase: true,
        required: false,
        trim: true,
        default: ''
    },
    German: {
        type: String,
        lowercase: true,
        required: false,
        trim: true,
        default: ''
    },
    Spanish: {
        type: String,
        lowercase: true,
        required: false,
        trim: true,
        default: ''
    }
});
const Translation = mongoose_1.default.model('translation', schema);
exports.default = Translation;
