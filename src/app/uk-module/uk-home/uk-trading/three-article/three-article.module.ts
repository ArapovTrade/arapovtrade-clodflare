import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeUkThreeComponent } from './home-uk-three/home-uk-three.component';

const routes: Routes = [{ path: '', component: HomeUkThreeComponent }];

@NgModule({
  declarations: [HomeUkThreeComponent],
 imports: [CommonModule,MatExpansionModule, RouterModule.forChild(routes)],
})
export class ThreeArticleModule {}
