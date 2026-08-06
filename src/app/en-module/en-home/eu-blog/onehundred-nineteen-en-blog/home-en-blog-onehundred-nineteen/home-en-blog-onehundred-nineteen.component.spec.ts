import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNineteenComponent } from './home-en-blog-onehundred-nineteen.component';

describe('HomeEnBlogOnehundredNineteenComponent', () => {
  let component: HomeEnBlogOnehundredNineteenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
