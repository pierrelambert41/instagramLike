import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram-like';

  ngOnInit(){
    const firebaseConfig = {
      apiKey: "AIzaSyBKSk4S25wxNHtglpy-4B46XhMk0R_DmDc",
      authDomain: "instagram-80cfe.firebaseapp.com",
      databaseURL: "https://instagram-80cfe.firebaseio.com",
      projectId: "instagram-80cfe",
      storageBucket: "instagram-80cfe.appspot.com",
      messagingSenderId: "169133064722",
      appId: "1:169133064722:web:20e885de47daac50"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
