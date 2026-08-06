import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtyfiveComponent } from './home-uk-blog-onehundred-sixtyfive.component';

describe('HomeUkBlogOnehundredSixtyfiveComponent', () => {
  let component: HomeUkBlogOnehundredSixtyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
