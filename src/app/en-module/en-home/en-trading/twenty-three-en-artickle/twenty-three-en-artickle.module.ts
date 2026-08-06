import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentyThreeComponent } from './home-en-twenty-three/home-en-twenty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentyThreeComponent }];
@NgModule({
  declarations: [HomeEnTwentyThreeComponent],
  imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class TwentyThreeEnArtickleModule {}
