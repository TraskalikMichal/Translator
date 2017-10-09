import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslationData } from '../../providers/translation-data';
import { DataProvider } from "../../providers/data/data";

import { NavParams } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private textForTranslation:string = '';
  private cardContent:string = '';

  public languages = ['cs','es','fr','de','it','en'];

  private langFrom: string;
  private langTo: string;

  private str: string='';

  constructor(public navCtrl: NavController, private translation: TranslationData,public data:DataProvider) {

  }

  /**
   * user input
   * @param tText 
   */
  public translateClick(tText:string){
    this.textForTranslation = tText;

    console.log(this.textForTranslation + ' ' + this.langFrom + ' ' + this.langTo);

    this.str = this.str.concat(this.textForTranslation);
    console.log(this.str);

    this.data.paramData = this.str;
    
    // pass text for translation to translation service
    this.translation.getTranslation(this.textForTranslation, this.langFrom, this.langTo).subscribe( (result) => {
      this.cardContent = result.responseData.translatedText;
    });



    
  }

}
