import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
  private loader : any;

  constructor(private loadCtrl : LoadingController) {

  }

  async startLoading(message){
    this.loader = await this.loadCtrl.create({
      message: message
    });

    return await this.loader.present();
  }

  public stopLoading(){
    setTimeout(() => {
      if (this.loader){
          this.loader.dismiss();
        }
    }, 150);
  }
}
