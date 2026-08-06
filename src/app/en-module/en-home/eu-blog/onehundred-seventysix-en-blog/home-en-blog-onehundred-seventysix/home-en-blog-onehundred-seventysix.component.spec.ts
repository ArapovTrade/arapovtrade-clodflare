import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventysixComponent } from './home-en-blog-onehundred-seventysix.component';

describe('HomeEnBlogOnehundredSeventysixComponent', () => {
  let component: HomeEnBlogOnehundredSeventysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
