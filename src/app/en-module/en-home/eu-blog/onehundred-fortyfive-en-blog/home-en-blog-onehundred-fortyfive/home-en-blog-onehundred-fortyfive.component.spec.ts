import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortyfiveComponent } from './home-en-blog-onehundred-fortyfive.component';

describe('HomeEnBlogOnehundredFortyfiveComponent', () => {
  let component: HomeEnBlogOnehundredFortyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
