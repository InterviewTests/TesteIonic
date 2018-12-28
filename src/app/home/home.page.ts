import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/api/movie';
import { Platform } from '@ionic/angular';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Need to view the dashboard component to be able hide its Details component
  @ViewChild(DashboardComponent) dashboard: DashboardComponent;
  currentTab: number;
  downloads: Movie[];

  constructor (
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private platform: Platform
  ) {}

  async ngOnInit() {
    // Setting the Home as the initial tab.
    this.currentTab = 1;
    // Checking if the user has verified it's account by email, if not tell him to do so.
    const emailVerified = this.activatedRoute.snapshot.queryParamMap.get('emailVerified');
    if (!emailVerified || emailVerified === 'false') {
      const toast = await this.toastController.create({
        message: 'Validate your email account!',
        color: 'warning',
        showCloseButton: false,
        position: 'top' as 'top',
        duration: 1000
      });
      toast.present();
    }

    // Retrieve the local list of downloaded movies.
    this.downloads = await this.storage.get('downloads') || [];

    // Overriding the hardware/software android backButton functionality so it returns to the home tab.
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      this.changeTab(1);
    });
    this.platform.backButton.subscribe(async () => {
      this.changeTab(1);
    });
    this.platform.ready().then(() => {
      document.addEventListener('backbutton', async () => {
        this.changeTab(1);
      });
    });
  }

  changeTab (tab: number) {
    // This method is resposible for keeping track of the curent tab and changing it when the user clicks on a tab button.
    this.currentTab = tab;
    this.dashboard.hideDetails();
  }

}
