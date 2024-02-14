import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import User, { IUser } from './userModel';
import * as userService from './userService';

//import { validateStaticProduct, validateUpdateProduct } from './productValidator';

// @Desc Add
// @Route /api/products/add
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  console.log('register');
  try {
    const { email, fullName, password, phoneNumber, city, address } = req.body;
    const userItem = { email, fullName, password, phoneNumber, city, address };
    // console.log(`register userItem ${JSON.stringify(userItem)}`);

    const user = await userService.add(userItem);

    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error register ${error}`,
    });
  }
});

// @Desc Add
// @Route /api/products/add
// @Method POST

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  console.log('Login Controller');
  try {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate a token upon successful authentication
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    // console.log('user', user);
    res.status(200).json({
      success: true,
      user: {
        email: user.email,
        fullName: user.fullName,
        userId: user._id,
        address: user.address,
        city: user.city,
        phoneNumber: user.phoneNumber,
      },
      token: token,
    });
  } catch (error) {
    console.error(`Error during login: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, fullName, phoneNumber, city, address } = req.body;
    const updatedFields = { email, fullName, phoneNumber, city, address };
    const userId = req.body.userId;
    // Assuming you have a method like updateProfile in your userService
    const updatedUser = await userService.update(userId, updatedFields);

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error updating profile: ${error}`,
    });
  }
});
