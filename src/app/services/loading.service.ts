import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
  private loader : any;
  constructor(private loadCtrl : LoadingController) {

  }

  startLoading(message): Promise<any>{
    return new Promise((resolve) => {
      this.loadCtrl.create({
        message: message
      }).then((loader) => {
        this.loader = loader;
        this.loader.present();
        resolve();
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  public stopLoading(){
    if (this.loader) {
      this.loader.dismiss();
    }
  }
}
