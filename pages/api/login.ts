import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "../../shared/utils/lib/cors";
import UserModel from "../../shared/shemas/User";
import mongoose from "mongoose";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res);

  if (req.method === "POST") {
    const json = JSON.parse(req.body);
    if (json) {
      mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
      const existingUser = UserModel.find({ email: json.email });
      if (existingUser) {
        res.status(200).json({ ok: "user exists" });
      } else {
        const user = new UserModel(json);

        user.save(function (err) {
          mongoose.disconnect(); // отключение от базы данных

          if (err) return console.log(err);
          console.log("Сохранен объект", user);
        });

        res.status(200).json({ ok: "saved" });
      }
    } else {
      res.status(500).json({ error: "something happened", json });
    }

    // // Get a database connection, cached or otherwise,
    // // using the connection string environment variable as the argument
    //
  } else {
    res.status(200).json({ ok: "ok" });
  }
};
