import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwelveComponent } from './home-en-twelve/home-en-twelve.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwelveComponent }];

@NgModule({
  declarations: [HomeEnTwelveComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwelveEnArtickleModule {}
