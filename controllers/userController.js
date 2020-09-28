import User from '../models/user/userModel.js';
import { getUserCredentials, comparePassword, hashPassword, checkUserExists, checkUserDoesNotExist } from '../utilites/user/user-utilities.js';
import { dbUserToUiUser, createdUserToUiUser } from '../parsers/user/ui-parsers.js';


export const createUser = async (req, res) => {
  try {
    const { user: newUser } = req.body;
    await checkUserDoesNotExist(newUser.username);
    const encryptedPassword = await hashPassword(newUser.password);
    const createdUser = new User({ ...newUser, password: encryptedPassword });
    const user = await createdUser.save();
    const { cookie, token } = getUserCredentials(user);
    const uiUser = createdUserToUiUser(user, token);
    res.cookie(cookie.cookie_name, token, { ...cookie.cookie_config });
    res.status(201).send({ user: uiUser, message: { content: 'Successfully created user' } })
  }

  catch (error) {
    res.status(500).send({ message: { content: 'An error occured creating user', info: error.message } })
  }
}


export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await checkUserExists(username);
    await comparePassword(password, user.password);
    const { cookie, token } = getUserCredentials(user);
    const uiUser = dbUserToUiUser(user, token);
    res.cookie(cookie.cookie_name, token, { ...cookie.cookie_config });
    res.status(200).send({ user: uiUser, message: { content: 'Successfully retreived user' } })
  }
  catch (error) {
    res.status(500).send({ message: { content: 'An error occured getting user', info: error.message } })
  }

}

export const uploadProfileImg = async (req, res) => {

    res.status(500).send({ message: { content: 'An error occured creating image', info: error.message } })

}




export const getUsernameAvailable = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  res.status(200).send({exists: user ? true : false});
}
