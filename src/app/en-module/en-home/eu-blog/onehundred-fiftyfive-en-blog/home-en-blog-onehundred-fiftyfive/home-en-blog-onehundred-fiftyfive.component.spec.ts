import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftyfiveComponent } from './home-en-blog-onehundred-fiftyfive.component';

describe('HomeEnBlogOnehundredFiftyfiveComponent', () => {
  let component: HomeEnBlogOnehundredFiftyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
