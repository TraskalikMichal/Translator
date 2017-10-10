import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnChanges } from '@angular/core';

import { DataProvider } from "../../providers/data/data";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage{

  private dataToShow: string;

  constructor(public navCtrl: NavController, public data:DataProvider) {
    
  }

  

}
