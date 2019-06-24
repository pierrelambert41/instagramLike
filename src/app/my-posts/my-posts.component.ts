import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { MyfireService } from '../shared/myfire.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private myFire: MyfireService, private notifier: NotificationService) { }

  ngOnInit() {
  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
      .then(data => {
        this.notifier.display('success',  'Picture Successfully uploaded !');
      })
      .catch(err => {
        this.notifier.display('error', err.message);
      });
    }
  }

}
