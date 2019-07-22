import {Component, Input, OnInit} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  @Input() imageName: string;
  @Input() displayPostedBy: boolean = false;
  defaultImage = "http://via.placeholder.com/150x150";
  imageData: any = {};

  ngOnInit() {
    firebase.database().ref('image').child(this.imageName)
      .once('value')
      .then(snapshot => {
        this.imageData = snapshot.val();
        this.defaultImage = this.imageData.fileUrl;
      });
  }
}
