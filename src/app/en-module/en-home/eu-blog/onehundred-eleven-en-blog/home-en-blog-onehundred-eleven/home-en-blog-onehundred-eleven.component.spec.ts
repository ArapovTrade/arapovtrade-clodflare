import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredElevenComponent } from './home-en-blog-onehundred-eleven.component';

describe('HomeEnBlogOnehundredElevenComponent', () => {
  let component: HomeEnBlogOnehundredElevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
