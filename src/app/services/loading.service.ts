import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
  private loader : any;
  constructor(private loadCtrl : LoadingController) {

  }

  /**
  * Inicia a exibição do componente de loading
  * @param {String} message Mensagem a ser exibida no componente de loading
  * @return {Promise}
  */
  startLoading(message): Promise<any>{
    return new Promise((resolve) => {
      this.loadCtrl.create({
        message: message
      }).then((loader) => {
        this.loader = loader;
        this.loader.present();
        resolve();
      }).catch((err) => {
        console.log('LoadingService', 'Start Loading', err);
      });
    });
  }

  /**
  * Para a exibição do componente de loading
  * @return {void}
  */
  public stopLoading(){
    if (this.loader) {
      this.loader.dismiss();
    }
  }
}
