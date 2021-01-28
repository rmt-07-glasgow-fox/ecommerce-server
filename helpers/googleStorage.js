const { Storage } = require('@google-cloud/storage');
const path = require('path');
const UUID = require('uuid-v4');

const storage = new Storage({
  projectId: process.env.FIREBASE_ID,
  keyFilename: path.join(__dirname, '..', 'firebase.json'),
});
const bucket = storage.bucket(`${process.env.FIREBASE_ID}.appspot.com`);

exports.uploadImage = async (file, image_name) => {
  if (!file) {
    throw new Error('No image file');
  }
  try {
    let uuid = UUID();
    const data = await bucket.upload(file.path, {
      destination: 'images/' + image_name,
      metadata: {
        contentType: file.type,
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    });

    const url =
      'https://firebasestorage.googleapis.com/v0/b/' +
      bucket.name +
      '/o/' +
      encodeURIComponent(data[0].name) +
      '?alt=media&token=' +
      uuid;
    return url;
  } catch (err) {
    return err.message;
  }
};

exports.deleteImage = async (image_name) => {
  try {
    await bucket.file('images/' + image_name).delete();
  } catch (err) {
    return err.message;
  }
};
