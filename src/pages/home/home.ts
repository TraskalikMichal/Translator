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

  public languages = ['cs','en','es','fr','de','it'];

  private langFrom: string;
  private langTo: string;

  public history= new Array<{from: string, to: string, fromText: string, toText: string}>();

  constructor(public navCtrl: NavController, private translation: TranslationData,public data:DataProvider) {

  }

  /**
   * user input
   * @param tText 
   */
  public translateClick(tText:string){
    this.textForTranslation = tText;

    console.log(this.textForTranslation + ' ' + this.langFrom + ' ' + this.langTo);
    
        
    // pass text for translation to translation service
    this.translation.getTranslation(this.textForTranslation, this.langFrom, this.langTo).subscribe( (result) => {    
      this.cardContent = result.responseData.translatedText;
      let transl = {from: '', to: '', fromText: '', toText: ''};
      transl.toText = this.cardContent;
      transl.from = this.langFrom;
      transl.to = this.langTo;
      transl.fromText = this.textForTranslation;      
      this.history.push(transl);
      console.log(this.history)
    });

    
  }

}
