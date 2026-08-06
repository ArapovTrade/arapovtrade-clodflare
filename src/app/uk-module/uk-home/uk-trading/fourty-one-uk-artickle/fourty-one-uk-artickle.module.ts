import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtyOneComponent } from './home-uk-fourty-one/home-uk-fourty-one.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtyOneComponent }];

@NgModule({
  declarations: [HomeUkFourtyOneComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtyOneUkArtickleModule {}
