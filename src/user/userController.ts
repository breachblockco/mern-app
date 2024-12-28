import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // validation
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    // database call
    const user = await userModel.findOne({ email });

    if (user) {
      const error = createHttpError(
        400,
        "User already exists with this email."
      );
      return next(error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;

  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }

  try {
    // token generation JWT
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // response
    res.status(201).json({ accessToken: token });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return next(createHttpError(500, "Error while signing jwt token"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(createHttpError(404, "User not found"));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(createHttpError(400, "Username or password incorrect"));
  }

  // create access token
  const token = sign({ sub: user._id }, config.jwtSecret as string, {
    expiresIn: "7d",
  });

  res.json({ accessToken: token });
};

export { createUser, loginUser };
