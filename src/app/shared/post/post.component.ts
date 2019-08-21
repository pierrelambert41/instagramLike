import {Component, Input, OnInit, Output} from '@angular/core';
import * as firebase from "firebase";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  @Input() imageName: string;
  @Input() displayPostedBy: boolean = true;
  @Input() displayFavoritesButton: boolean = true;
  defaultImage = "http://via.placeholder.com/150x150";
  imageData: any = {};

  @Output() favoriteClicked = new EventEmitter<any>();

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;

    firebase.database().ref('images').child(this.imageName)
      .once('value')
      .then(snapshot => {
        this.imageData = snapshot.val();
        this.defaultImage = this.imageData.fileUrl;

        if(this.imageData.uploadedBy.uid === uid) {
          this.displayFavoritesButton = false;
        }
      });
  }

  onFavoritesClicked() {
    this.favoriteClicked.emit(this.imageData);
  }
}
