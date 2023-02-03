import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST;
export const PASSWORD_CHANGE_AFTER = process.env.PASSWORD_CHANGE_AFTER || 180;
