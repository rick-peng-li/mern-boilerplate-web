import fs from 'fs';
import { join } from 'path';

export const deleteAllAvatars = async (folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      if (file.startsWith('avatar-')) {
        fs.unlinkSync(join(folderPath, file));
      }
    });
  } catch (err) {
    console.log('Error deleting avatars:', err);
  }
};

export const deleteAvatar = async (folderPath, filename) => {
  try {
    fs.unlinkSync(join(folderPath, filename));
  } catch (err) {
    console.log('Error deleting avatar:', err);
  }
};