import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkFourtySixComponent } from './home-uk-fourty-six/home-uk-fourty-six.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkFourtySixComponent }];

@NgModule({
  declarations: [HomeUkFourtySixComponent],
  imports: [CommonModule, MatExpansionModule, RouterModule.forChild(routes)],
})
export class FourtySixUkArtickleModule {}
