import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Translation } from '../../model/translation';

/*
  Generated class for the TranslationHistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranslationHistoryProvider {

  private historyArray: Array<Translation>;

  constructor(public http: Http, public storage: Storage) {
    this.historyArray = [];
    storage.get('history').then((value) => {
      if(value!=null)
      {
        this.historyArray =  value;
      }      
    });
  }

  pushToHistory(text, result, from, to) {
    let transObj = new Translation(text, result, from, to);    
    this.historyArray.unshift(transObj);
  }

  getHistoryData(): Array<Translation> {
    return this.historyArray;
  }

}
