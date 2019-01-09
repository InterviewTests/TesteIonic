import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {
    private activeToast: any;

    constructor(private toastCtrl:ToastController) {
		}

		public showToastAlert(message:string, time:number = 2500): Promise<any> {
      return new Promise((resolve, reject) => {
        if (this.activeToast != null){
          this.dismissToast();
        }
        this.toastCtrl.create({
          message: message,
          duration: time,
          position: 'top',
          color: "primary",
          cssClass: "toast-controller-class",
          showCloseButton: true,
          closeButtonText: 'X'
        }).then((toast) => {
          this.activeToast = toast;
          this.activeToast.present();
          resolve();
        });
      });
    }

    public dismissToast(){
      if (this.activeToast) {
        this.activeToast.dismiss();
      }
    }

}
