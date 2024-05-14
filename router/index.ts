import { Router } from "express";

const router = Router();

router.get("/new-user", (req, res) => {
  const { firstname, lastname, email, password } = req.query;

  if (
    firstname != undefined &&
    lastname != undefined &&
    email != undefined &&
    password != undefined
  ) {
  }
});
