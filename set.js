 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUsyUTBHTFlsYU9ycjZrcWZKeWp3Y3pEN2RqdGRxNURxQWNaazNsR1htVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2psNUp0NzdJM3N6UmMybTc5LzJCT0c2elIrRC9VazBjcVNRRVBnMVZnYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTlprRFVzOWxSdmxTU091L3doNURFU0VTcUd1YUREQjJTYkNhUnVJL2xvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJueWFjRVJXRnNRUWlmMkpUakxoRnV5K2lEVzYxMFMwczU2TG9sRmJ5Qms0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFIUVVnb1B2cHpZWXZEVGhwWGY5Y2gxR0hFcG92WWJRR0dYb2MzT3BoVkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImE4S1ZyTXBmYlJBNjBXcHg0dXlEaWpaR3JyTG1kS0hQZjlUNWR1Z2hpaVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0F1aUZwVEx1MkNBSUNieVpHWTR3M1NYKzFKNVBmM0x0cFFpTHpEYWhIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRDBsQ0lGenhacVBKVGJpUzY2S0V4TGs2UVRUTlJXbVJEcDZPeDdkR2tEcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhFcVhUeU1MRUJaRFZLbU0rUDNXdjBmei93R2FJdjlybkMxM0NTa015YkRaUGhzcUJLK0h6dk1PeVEyUTIyenJxeWEvOEx4d21QOUhDMEtoK3ZXN2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM0LCJhZHZTZWNyZXRLZXkiOiJCTmcyYWp6MDloZ0lXWWZ6N1l3Q2hiS1dDSXZjUW0vNnhyc3d5bUE3YmYwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNTTd6SDZJV1FkT19BcnRLNXRKMzlRIiwicGhvbmVJZCI6ImI1YTM2MDVkLWM2NmUtNGQ5My05NjhhLWFlOGM5NTE2NjJlYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDMy9wN3VmaGYrZ0pYVTFjeDVJY1VubURnQWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1NwYnFZQ2NVUGxxZG15azk3RzZrNHZKSGxFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRGQzZOMkVLIiwibWUiOnsiaWQiOiIyMzQ4MTA0NDAwMDY2OjUzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLZVVnUG9ERVA3SzhMWUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJORmozUC8zMkk4RmNwdUZYZThZSWJDdG5GbEhLK0FFbytpV3J6NEI3MFc0PSIsImFjY291bnRTaWduYXR1cmUiOiJJcHF1NEhkaEQwbTFZeG9zTEZFK3d4MGhId3VqNWVMMXR3VXdQSWtWaEhXZGNVdWg3WFU4NkhpcmxkNFdySk1PaVp6cHhScGMwSSsvTHg5NHFpVFRDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMDl5WGllKy9KcDF5cGFhNDM4TGRkaGdBKzA3TktSa3dFU0VsZHBHRGZZYi9SNDAraVZzN1ZieW5yMHRGRW1GZmtVV0VDbEwvYXVzK2FYZWtxTXQyaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTA0NDAwMDY2OjUzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRSWTl6Lzk5aVBCWEtiaFYzdkdDR3dyWnhaUnl2Z0JLUG9scTgrQWU5RnUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjU3MDM1NjR9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "on",
    OWNER_NAME: process.env.OWNER_NAME || "Joshua",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348104400066",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Josh-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "No",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'available',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
