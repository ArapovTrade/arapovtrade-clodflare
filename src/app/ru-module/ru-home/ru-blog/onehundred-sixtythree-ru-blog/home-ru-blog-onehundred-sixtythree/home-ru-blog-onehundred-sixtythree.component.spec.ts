import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtythreeComponent } from './home-ru-blog-onehundred-sixtythree.component';

describe('HomeRuBlogOnehundredSixtythreeComponent', () => {
  let component: HomeRuBlogOnehundredSixtythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
