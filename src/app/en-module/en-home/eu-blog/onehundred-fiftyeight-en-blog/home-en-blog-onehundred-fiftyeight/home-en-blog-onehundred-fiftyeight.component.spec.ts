import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftyeightComponent } from './home-en-blog-onehundred-fiftyeight.component';

describe('HomeEnBlogOnehundredFiftyeightComponent', () => {
  let component: HomeEnBlogOnehundredFiftyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
