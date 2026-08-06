import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnFourtyThreeComponent } from './home-en-fourty-three/home-en-fourty-three.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnFourtyThreeComponent }];

@NgModule({
  declarations: [HomeEnFourtyThreeComponent],
    imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyThreeEnArtickleModule {}
