import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyThreeComponent } from './home-uk-thirty-three/home-uk-thirty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyThreeComponent }];
@NgModule({
  declarations: [HomeUkThirtyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeUkArtickleModule {}
