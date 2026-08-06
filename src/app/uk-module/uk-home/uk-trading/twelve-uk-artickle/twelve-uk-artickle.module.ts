import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwelveComponent } from './home-uk-twelve/home-uk-twelve.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwelveComponent }];

@NgModule({
  declarations: [HomeUkTwelveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwelveUkArtickleModule {}
