import { NextApiRequest, NextApiResponse } from "next";
import SchemaModel from "../../../shared/shemas/Scenario";
import mongoose from "mongoose";
import { runMiddleware } from "../../../shared/utils/lib/cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res);

  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const scene = new SchemaModel(data);

    scene.save(function (err) {
      mongoose.disconnect(); // отключение от базы данных

      if (err) return console.log(err);
      console.log("Сохранен объект", scene);
    });
    // mongoose.disconnect(); // отключение от базы данных

    res.status(200).json({ ok: "saved" });
  } else {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    SchemaModel.find({}, (err, docs) => {
      if (!err) res.json({ docs });
    });
  }
};
