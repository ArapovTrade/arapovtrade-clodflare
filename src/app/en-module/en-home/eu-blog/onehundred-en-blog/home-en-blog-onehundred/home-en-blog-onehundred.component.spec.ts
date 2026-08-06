import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredComponent } from './home-en-blog-onehundred.component';

describe('HomeEnBlogOnehundredComponent', () => {
  let component: HomeEnBlogOnehundredComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
