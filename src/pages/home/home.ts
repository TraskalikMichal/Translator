import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslationData } from '../../providers/translation-data';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { TranslationHistoryProvider } from '../../providers/translation-history/translation-history';

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

  private speechToTextEnable: boolean = false;

  public speech: boolean;
  public isToggled: boolean;

  constructor(public navCtrl: NavController, private translation: TranslationData, private speechRecognition: SpeechRecognition, private translationHistory: TranslationHistoryProvider, private zone: NgZone, private storage: Storage, private tts: TextToSpeech) {
    this.speechRecognition.isRecognitionAvailable().then(
      (availability: boolean) => {
        this.speechToTextEnable = availability;
      }
    );
    
    storage.get('speech').then((value) => {
      this.speech = value;
    });
  }

  public saveOptionSpeech() {
    this.storage.set('speech', this.isToggled);
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
      this.translationHistory.pushToHistory(this.textForTranslation, this.cardContent, this.langFrom, this.langTo);
      this.storage.set('history',this.translationHistory.getHistoryData());
      if(this.isToggled)
      {
        this.tts.speak(this.cardContent)
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
      }
    });    
  }

  private recogniseSpeech() {
    let options = {
      language: this.langFrom
    };

    this.speechRecognition.startListening(options).subscribe(
      (matches: Array<string>) => {
        let text = matches.join(' ');
        
        this.zone.run(() => {
        this.translateClick(text);
        });
      }
    );
  }

  speechToText() {
    if(this.speechToTextEnable){
      this.speechRecognition.hasPermission().then(
        (hasPermission: boolean) => {
          if(hasPermission) {
            this.recogniseSpeech();
          } else {
            this.speechRecognition.requestPermission().then(
              () => {
                console.log("Permission granted!");
                this.recogniseSpeech();
            },
              () => {
                console.log("Permission denied!");
            });
          }
      });
    } else {
      console.log("Speech to text is not available!")
    }
  }

}
