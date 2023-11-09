"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const translation_1 = __importDefault(require("./routes/translation"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOption = {
    origin: 'chrome-extension://ifpaniondjgkknjhpnjdbpbihgimgadb',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/', translation_1.default);
const port = 3000;
const mongo_url = process.env.APP_ENVIRONMENT === 'Development'
    ? process.env.MONGO_URL_DEV
    : process.env.APP_ENVIRONMENT === 'Production'
        ? process.env.MONGO_URL_PROD
        : process.env.MONGO_URL_TEST;
console.log(mongo_url);
mongoose_1.default
    .connect(mongo_url)
    .then(() => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use('/', translation_1.default);
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch(() => {
    console.log("Can't connect to Database");
});
module.exports = app;
