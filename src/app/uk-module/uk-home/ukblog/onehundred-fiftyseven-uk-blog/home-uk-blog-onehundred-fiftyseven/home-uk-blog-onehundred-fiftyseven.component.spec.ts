import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftysevenComponent } from './home-uk-blog-onehundred-fiftyseven.component';

describe('HomeUkBlogOnehundredFiftysevenComponent', () => {
  let component: HomeUkBlogOnehundredFiftysevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
