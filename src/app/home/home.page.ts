import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/api/movie';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(DashboardComponent) dashboard: DashboardComponent;
  currentTab: Number;
  downloads: Movie[];

  constructor (
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.currentTab = 1;
    const emailVerified = this.activatedRoute.snapshot.queryParamMap.get('emailVerified');
    if (!emailVerified || emailVerified === 'false') {
      const toast = await this.toastController.create({
        message: 'Validate your email account!',
        color: 'warning',
        showCloseButton: false,
        duration: 2000
      });
      toast.present();
    }
    this.downloads = await this.storage.get('downloads') || [];
  }

  changeTab (tab: number) {
    this.currentTab = tab;
    this.dashboard.hideDetails();
  }

}
