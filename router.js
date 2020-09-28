import express from 'express';
import { getUser, createUser, getUsernameAvailable, uploadProfileImg } from './controllers/userController.js';
import {  createAccount, getAccounts, getAccountToken } from './controllers/accountController.js';
import { requestValidators } from './utilites/validation/request-validators.js'
import { createHome, getUserHome, getUserHomes } from './controllers/homeController.js';
import { createDrive, createFile, createFolder, getDrive, getFolder, getFile } from './controllers/driveController.js'; 

const { users : { createUserValidation } } = requestValidators;

const router = express.Router();

// users
router.post('/users', createUserValidation, createUser);
router.put('/users', getUser);
router.get('/users/validate-username', getUsernameAvailable);
router.post('/users/profile-img', uploadProfileImg);

// homes
router.post('/homes', createHome);
router.get('/homes', getUserHomes);
router.get('/homes/:home_id', getUserHome);

// drive
router.post('/drive', createDrive);
router.get('/drive/:drive_id', getDrive);

// drive / folders
router.post('/drive/:drive_id/folders', createFolder);
router.get('/drive/:drive_id/folders/:folder_id', getFolder);

// drive / folders / files
router.post('/drive/:drive_id/folders/:folder_id/files', createFile);
router.get('/drive/:drive_id/folders/:folder_id/files/:file_id', getFile);


// accounts
router.post('/homes/:home_id/accounts', createAccount);
router.get('/homes/:home_id/accounts', getAccounts);
router.post('/homes/:home_id/accounts/access_token', getAccountToken);






export default router;