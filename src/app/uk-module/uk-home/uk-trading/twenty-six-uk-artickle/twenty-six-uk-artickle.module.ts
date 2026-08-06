import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentySixComponent } from './home-uk-twenty-six/home-uk-twenty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentySixComponent }];
@NgModule({
  declarations: [HomeUkTwentySixComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentySixUkArtickleModule {}
