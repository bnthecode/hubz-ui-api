import http from '../http.js';
import Drive from '../models/drive/driveModel.js';
import Home from '../models/home/homeModel.js';
import User from '../models/user/userModel.js';
import { dbHomeToUiHome } from '../parsers/home/home-parsers.js';

export const createHome = async (req, res) => {
  try {
    const { home_name, home_password, home_type } = req.body;
    const { user_id } = req;
    const foundUser = await User.findOne({ _id: user_id });
    const newHome = new Home({ home_name, home_password, home_type, home_users: [user_id] });
    foundUser.associated_homes.push(newHome._id);
    const savedHome = await newHome.save();
  
    await foundUser.save();
    const uiHome = dbHomeToUiHome(savedHome);


    
    res.status(201).send({ home: uiHome, message: { content: 'Successfully created home' } });
  }
  catch (error) {
    res.status(500).send({ message: { content: 'An error occurred creating your home', info: error.message } })
  }
}

export const getUserHomes = async (req, res) => {
  try {
    const { user_id } = req;
    const foundHomes = await Home.find({ home_users: user_id });
      const uiHomes = foundHomes.map(home => dbHomeToUiHome(home));
    res.status(200).send({ homes: uiHomes, message: { content: 'Successfully retreived homes' } });
  }
  catch (error) {
    res.status(500).send({ message: { content: 'An error occurred getting homes', info: error.message } })
  }
}

export const getUserHome = async (req, res) => {
  try {
    const { home_id } = req.params;
    const foundHome = await Home.findOne({ _id: home_id });
      const uiHome = dbHomeToUiHome(foundHome);
    res.status(200).send({ home: uiHome, message: { content: 'Successfully retreived homes' } });
  }
  catch (error) {
    res.status(500).send({ message: { content: 'An error occurred getting homes', info: error.message } })
  }
}

