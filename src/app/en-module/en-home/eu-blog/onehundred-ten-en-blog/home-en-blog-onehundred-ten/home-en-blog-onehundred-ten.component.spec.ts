import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTenComponent } from './home-en-blog-onehundred-ten.component';

describe('HomeEnBlogOnehundredTenComponent', () => {
  let component: HomeEnBlogOnehundredTenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
