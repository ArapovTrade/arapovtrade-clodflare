import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtythreeComponent } from './home-uk-blog-onehundred-sixtythree.component';

describe('HomeUkBlogOnehundredSixtythreeComponent', () => {
  let component: HomeUkBlogOnehundredSixtythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
