import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyThreeComponent } from './home-uk-fourty-three/home-uk-fourty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyThreeComponent }];

@NgModule({
  declarations: [HomeUkFourtyThreeComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyThreeUkArtickleModule {}
