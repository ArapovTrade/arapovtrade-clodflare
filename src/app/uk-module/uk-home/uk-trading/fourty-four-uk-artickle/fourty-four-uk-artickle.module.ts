import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyFourComponent } from './home-uk-fourty-four/home-uk-fourty-four.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyFourComponent }];

@NgModule({
  declarations: [HomeUkFourtyFourComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyFourUkArtickleModule {}
