import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftysevenComponent } from './home-en-blog-onehundred-fiftyseven.component';

describe('HomeEnBlogOnehundredFiftysevenComponent', () => {
  let component: HomeEnBlogOnehundredFiftysevenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
