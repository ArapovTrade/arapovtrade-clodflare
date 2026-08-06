import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightysixComponent } from './home-en-blog-onehundred-eightysix.component';

describe('HomeEnBlogOnehundredEightysixComponent', () => {
  let component: HomeEnBlogOnehundredEightysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
