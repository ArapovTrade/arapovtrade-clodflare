import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyTwoComponent } from './home-uk-fourty-two/home-uk-fourty-two.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyTwoComponent }];

@NgModule({
  declarations: [HomeUkFourtyTwoComponent],
   imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyTwoUkArtickleModule {}
