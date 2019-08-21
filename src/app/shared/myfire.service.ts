import * as firebase from 'firebase';
import {UserService} from "./user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class MyfireService {

  constructor(private user: UserService) {

  }

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value').then(snapshot => snapshot.val());
  }

  generateRandomName() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  uploadFile(file) {
    const fileName = this.generateRandomName();
    const fileRef = firebase.storage().ref().child('images/' + fileName);
    const upLoadTesk = fileRef.put(file);
    return new Promise((resolve, reject) => {
      upLoadTesk.on('state_changed', () => {
      }, error => {
        reject(error);
      }, () => {
        firebase.storage().ref().child('images/' + fileName).getDownloadURL().then((url) => {
          const fileUrl = url;
          resolve({fileName, fileUrl});
        });
      });
    });
  }

  handleImageUpload(data) {
    const user = this.user.getProfile();
    const newPersnalPostkey = firebase.database().ref().child('myposts').push().key;
    const imgDetails = {
      fileUrl: data['fileUrl'],
      name: data['fileName'],
      creationDate: new Date().toString(),
      uploadedBy: user,
      favoriteCount: 0
    };
    const persnalPostDetail = {
      fileUrl: data['fileUrl'],
      name: data['fileName'],
      creationDate: new Date().toString()
    };
    const allPostsKey = firebase.database().ref('myposts').push().key;
    const allPostsDetail = {
      fileUrl: data['fileUrl'],
      name: data['fileName'],
      creationDate: new Date().toString(),
      uploadedBy: user
    };
    const updates = {};
    updates['/myposts/' + user.uid + '/' + newPersnalPostkey] = persnalPostDetail;
    updates['/allposts/' + allPostsKey] = allPostsDetail;
    updates['/images/' + data['fileName']] = imgDetails;
    return firebase.database().ref().update(updates);
  }

  getUserPostsRef(uid) {
    return firebase.database().ref('myposts').child(uid);
  }

  handleFavoriteClicked(imageData) {
    const uid = firebase.auth().currentUser.uid;

    const updates = {};
    updates['/images/' + imageData.name + '/oldFavoriteCount'] = imageData.favoriteCount;
    updates['/images/' + imageData.name + '/favoriteCount'] = imageData.favoriteCount + 1;
    updates['/favorites/' + uid + imageData.name] = imageData;
    return firebase.database().ref().update(updates);
  }

  followUser(uploadedByUser) {
    const uid = firebase.auth().currentUser.uid;

    const updates = {};
    updates['/follow/' + uid + "/" + uploadedByUser.uid] = true;

    return firebase.database().ref().update(updates);
  }

}

