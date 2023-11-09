import { Response } from 'express';
// import { Req } from '../interface/Interface'
import Translation from '../models/translation';

const TranslationController = {
  show: async (req: any, res: Response) => {
    const queryLanguage = req.query.queryLanguage;
    console.log(queryLanguage, req.query.queryWord);

    const query: any = {};
    query[queryLanguage] = req.query.queryWord;
    console.log(query[queryLanguage]);

    try {
      const translation: any = await Translation.findOne(query);
      console.log(translation[req.query.translationLanguage]);
      //   console.log();

      res.status(200).send({
        data: translation[req.query.translationLanguage],
        error: null
      });
    } catch (error) {
      res.status(400).send({ data: null, error: 'Unable to Retrieve Translation' });
    }
  },
  create: async (req: any, res: Response) => {
    console.log(req.body);

    const data: any = {};
    data[req.body.queryLanguage] = req.body.queryWord;
    data[req.body.translationLanguage] = req.body.translationWord as string;
    console.log(data);

    // Check if Word Exists
    const exists = await Translation.find({
      $or: [
        { English: req.body.queryWord },
        { French: req.body.queryWord },
        { German: req.body.queryWord },
        { Spanish: req.body.queryWord }
      ]
    });

    if (exists.length > 0) {
      res.status(400).send({ data: null, error: 'Word Already Exists' });
    } else {
      try {
        await Translation.create(data);
        res.status(201).send({ data: 'Translation Created Successfully', error: null });
      } catch (error) {
        res.status(400).send({ data: null, error: 'Unable to Create Translation' });
      }
    }
  },
  update: async (req: any, res: Response) => {
    console.log(req.body);

    const data: any = {};
    data[req.body.queryLanguage] = req.body.queryWord;
    data[req.body.translationLanguage] = req.body.translationWord as string;
    console.log(data);

    // Declare Condition Object
    const condition: any = {};
    condition[req.body.queryLanguage] = data[req.body.queryLanguage].toLowerCase();
    console.log(condition);

    try {
      const update = await Translation.updateOne(condition, data);
      if (update.acknowledged) {
        res.status(200).send({ data: 'Translation Updated Successfully', error: null });
      } else {
        res.status(400).send({ data: null, error: 'Unable to Update Translation' });
      }
    } catch (error) {
      res.status(400).send({ data: null, error: 'An Error Occured' });
    }
  },
  delete: async (req: any, res: any) => {
    console.log(req.body);

    const queryLanguage = req.body.queryLanguage;

    const query: any = {};
    query[queryLanguage] = req.body.queryWord.toLowerCase();

    try {
      const translation = await Translation.deleteOne(query);

      if (translation.acknowledged) {
        res.status(200).send({ data: 'Translation Deleted Successfully', error: null });
      } else {
        res.status(404).send({ data: null, error: 'Record does not Exist' });
      }
    } catch (error) {
      res.status(400).send({ data: null, error: 'Unable to Delete Translation' });
    }
  }
};

export default TranslationController;
