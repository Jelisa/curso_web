const fs = require('fs');

// Defines the file to backup and where the copy should be created
const FILE_TO_BACKUP = 'app.js'
const BACKUP_FOLDER = "./backups"


// Check wether the file to backup exists or not. Throw an Error if it doesn't exist.
if (!fs.existsSync(FILE_TO_BACKUP)){
    throw `There's no file named '${FILE_TO_BACKUP}' in the current directory.`
}
// Read the file to backup
const copia = fs.readFileSync(FILE_TO_BACKUP, 'utf-8');

// Check if the backups folder exists and if it doesn't create it.
if (!fs.existsSync(BACKUP_FOLDER)){
    fs.mkdirSync(BACKUP_FOLDER)
}


/* backups with numeric Ids */ 
// const BACKUP_FILES = fs.readdirSync(BACKUP_FOLDER);
// let backupId = 0;

// backupId = parseInt(obtainLastBackupId(BACKUP_FILES)) + 1;

// if (isNaN(backupId) || !backupId ){
//     throw `The backupId variable is not defined, has the value: '${backupId}' , check your code!`
// }

// // Create the copy using the numberId.
// fs.writeFileSync(`${BACKUP_FOLDER}/backup_${backupId}.js`, copia);

/* Backups with the date in DD_MM_YY_HH_MM_SS as Id*/
const CURRENT_DATE = new Date()
// const DAY = Dat
const BACKUP_DATE_ID = CURRENT_DATE.toLocaleDateString().replaceAll("/","_")+ '_'+CURRENT_DATE.toLocaleTimeString().replaceAll(":","_")

fs.writeFileSync(`${BACKUP_FOLDER}/backup_${BACKUP_DATE_ID}.js`, copia);


function obtainLastBackupId (backupFiles){
    let lastBackupId;
    if (backupFiles.length == 0) {
        lastBackupId = 0;
    }
    else {
        const lastBackup = backupFiles[backupFiles.length - 1];
        const lastBackupFileNameNoExtension = lastBackup.split('.')[0];
        const lastBackupFileNameSplit = lastBackupFileNameNoExtension.split('_');
        lastBackupId = lastBackupFileNameSplit[lastBackupFileNameSplit.length - 1];
    }
    return lastBackupId
}