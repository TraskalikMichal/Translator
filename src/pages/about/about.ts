import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { Translation } from '../../model/translation'
import { TranslationHistoryProvider } from '../../providers/translation-history/translation-history';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage{

  private historyArray: Array<Translation>;

  constructor(public navCtrl: NavController, private translationHistory: TranslationHistoryProvider, private storage: Storage, private tts: TextToSpeech) {
    
  }

  ionViewWillEnter() {
    this.historyArray = this.translationHistory.getHistoryData(); 
  }

  delete(his: Translation) {
    let index = this.historyArray.indexOf(his)
    if(index !== -1)
    {
      this.historyArray.splice(index, 1);
    }
    this.storage.set('history', this.historyArray);
  }

  textToSpeech(his: string) {
    this.tts.speak(his)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }  

}
