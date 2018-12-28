import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/api/movie';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  @Output() public changeTab = new EventEmitter();
  @Input() public downloads: Movie[];
  now: number;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    setInterval(() => this.now = Date.now(), 1000);
  }

  async delete(id: Number) {
    const loading = await this.loadingController.create({
      keyboardClose: true,
      translucent: true
    });
    const toastDef = {
      message: 'Movie Deleted!',
      color: 'success',
      showCloseButton: false,
      duration: 2000
    };
    await loading.present();
    const index = this.downloads.findIndex(d => d.id === id);
    this.downloads.splice(index, 1);
    const toast = await this.toastController.create(toastDef);
    toast.present();
    await loading.dismiss();
    if (this.downloads.length === 0) {
      this.changeTab.emit(1);
    }
  }

}
