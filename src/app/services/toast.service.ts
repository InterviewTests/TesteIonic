import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {
    private activeToast: any;

    constructor(private toastCtrl:ToastController) {
		}

    /**
    * Inicia a exibição da mensagem no Toast
    * @param {String} message Mensagem a ser exibida no Toast
    * @param {String} time Tempo de exibição do toast
    * @return {Promise}
    */
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

    /**
    * Para a exibição da mensagem do Toast
    * @return {void}
    */
    public dismissToast(){
      if (this.activeToast) {
        this.activeToast.dismiss();
      }
    }

}
