import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtyTwoComponent } from './home-en-thirty-two/home-en-thirty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtyTwoComponent }];
@NgModule({
  declarations: [HomeEnThirtyTwoComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyTwoEnArtickleModule {}
