import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { MyfireService } from '../shared/myfire.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  personalPostsRef: any;
  postLists: any = [];

  constructor(private myFire: MyfireService, private notifier: NotificationService) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.myFire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      })
    });
  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
      .then(data => {
        this.notifier.display('success',  'Picture Successfully uploaded !');
        this.myFire.handleImageUpload(data);
      })
      .catch(err => {
        this.notifier.display('error', err.message);
      });
    }
  }

  ngOnDestroy() {
    this.personalPostsRef.off();
  }

}
