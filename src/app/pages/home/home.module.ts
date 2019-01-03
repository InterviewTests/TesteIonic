import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SearchComponent } from '../../components/search/search.component';
import { HorizontalScrollComponent } from '../../components/horizontal-scroll/horizontal-scroll.component';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, HorizontalScrollComponent, SearchComponent, GridViewComponent]
})
export class HomePageModule {}
