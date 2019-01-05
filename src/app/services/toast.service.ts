import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {
    private activeToast: any;
    constructor(private toastCtrl:ToastController) {
		}

		public showToastAlert(message:string, time:number = 3500){
      if (this.activeToast != null){
        this.dismissToast();
      }
      this.activeToast = this.toastCtrl.create({
        message: message,
        duration: time,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'x'
      });
      this.activeToast.present();
    }

    public dismissToast(){
      this.activeToast.dismiss();
    }

}
