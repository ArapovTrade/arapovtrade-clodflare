import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredOneComponent } from './home-en-blog-onehundred-one.component';

describe('HomeEnBlogOnehundredOneComponent', () => {
  let component: HomeEnBlogOnehundredOneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
