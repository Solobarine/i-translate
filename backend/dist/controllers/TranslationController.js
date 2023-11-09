"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Req } from '../interface/Interface'
const translation_1 = __importDefault(require("../models/translation"));
const TranslationController = {
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryLanguage = req.query.queryLanguage;
        console.log(queryLanguage, req.query.queryWord);
        const query = {};
        query[queryLanguage] = req.query.queryWord;
        console.log(query[queryLanguage]);
        try {
            const translation = yield translation_1.default.findOne(query);
            console.log(translation[req.query.translationLanguage]);
            //   console.log();
            res.status(200).send({
                data: translation[req.query.translationLanguage],
                error: null
            });
        }
        catch (error) {
            res.status(400).send({ data: null, error: 'Unable to Retrieve Translation' });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const data = {};
        data[req.body.queryLanguage] = req.body.queryWord;
        data[req.body.translationLanguage] = req.body.translationWord;
        console.log(data);
        // Check if Word Exists
        const exists = yield translation_1.default.find({
            $or: [
                { English: req.body.queryWord },
                { French: req.body.queryWord },
                { German: req.body.queryWord },
                { Spanish: req.body.queryWord }
            ]
        });
        if (exists.length > 0) {
            res.status(400).send({ data: null, error: 'Word Already Exists' });
        }
        else {
            try {
                yield translation_1.default.create(data);
                res.status(201).send({ data: 'Translation Created Successfully', error: null });
            }
            catch (error) {
                res.status(400).send({ data: null, error: 'Unable to Create Translation' });
            }
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const data = {};
        data[req.body.queryLanguage] = req.body.queryWord;
        data[req.body.translationLanguage] = req.body.translationWord;
        console.log(data);
        // Declare Condition Object
        const condition = {};
        condition[req.body.queryLanguage] = data[req.body.queryLanguage].toLowerCase();
        console.log(condition);
        try {
            const update = yield translation_1.default.updateOne(condition, data);
            if (update.acknowledged) {
                res.status(200).send({ data: 'Translation Updated Successfully', error: null });
            }
            else {
                res.status(400).send({ data: null, error: 'Unable to Update Translation' });
            }
        }
        catch (error) {
            res.status(400).send({ data: null, error: 'An Error Occured' });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const queryLanguage = req.body.queryLanguage;
        const query = {};
        query[queryLanguage] = req.body.queryWord.toLowerCase();
        try {
            const translation = yield translation_1.default.deleteOne(query);
            if (translation.acknowledged) {
                res.status(200).send({ data: 'Translation Deleted Successfully', error: null });
            }
            else {
                res.status(404).send({ data: null, error: 'Record does not Exist' });
            }
        }
        catch (error) {
            res.status(400).send({ data: null, error: 'Unable to Delete Translation' });
        }
    })
};
exports.default = TranslationController;
