import * as firebase from 'firebase';

export class MyfireService {

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value').then(snapshot => snapshot.val());
  }

  generateRandomName() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  uploadFile(file) {
    const fileName = this.generateRandomName() + ".jpg";
    const fileRef = firebase.storage().ref().child('image/' + fileName);
    const uploadTask = fileRef.put(file);

    return new Promise((resolve, reject) => {

      uploadTask.on('state_changed', snapshot => {

      }, error => {
        reject(error);
      }, () => {
        const fileUrl = uploadTask.snapshot.downloadURL;
        resolve({fileName, fileUrl});
      });
    });
  }
}
