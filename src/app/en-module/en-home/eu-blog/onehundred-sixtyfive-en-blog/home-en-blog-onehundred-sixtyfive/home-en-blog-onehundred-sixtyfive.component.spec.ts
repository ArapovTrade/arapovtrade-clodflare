import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtyfiveComponent } from './home-en-blog-onehundred-sixtyfive.component';

describe('HomeEnBlogOnehundredSixtyfiveComponent', () => {
  let component: HomeEnBlogOnehundredSixtyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
