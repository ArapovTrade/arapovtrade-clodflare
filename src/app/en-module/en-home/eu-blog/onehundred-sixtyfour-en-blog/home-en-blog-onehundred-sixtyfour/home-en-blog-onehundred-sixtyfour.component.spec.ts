import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtyfourComponent } from './home-en-blog-onehundred-sixtyfour.component';

describe('HomeEnBlogOnehundredSixtyfourComponent', () => {
  let component: HomeEnBlogOnehundredSixtyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
