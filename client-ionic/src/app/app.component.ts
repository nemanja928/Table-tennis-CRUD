
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public appPages = [
    {
      title: 'Cups',
      url: '/cups',
      icon: 'trophy',
      img: './assets/img/cup.png'
    },
    {
      title: 'Groups',
      url: '/groups',
      icon: 'grid',
      img: './assets/img/group.png'
    },
    {
      title: 'Teams',
      url: '/teams',
      icon: 'people',
      img: './assets/img/teams.png'
    },
    {
      title: 'Games',
      url: '/games',
      icon: 'tennisball',
      img: './assets/img/games.png'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private router: Router
  ) 
  
    
  {
    this.initializeApp();

    console.log(this.router.url);
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  routeImage(routeId) {
    return this.router.url.startsWith(routeId); 
  }
  
  
}
