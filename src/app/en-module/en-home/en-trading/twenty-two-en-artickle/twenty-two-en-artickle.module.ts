import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentyTwoComponent } from './home-en-twenty-two/home-en-twenty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentyTwoComponent }];
@NgModule({
  declarations: [HomeEnTwentyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyTwoEnArtickleModule {}
