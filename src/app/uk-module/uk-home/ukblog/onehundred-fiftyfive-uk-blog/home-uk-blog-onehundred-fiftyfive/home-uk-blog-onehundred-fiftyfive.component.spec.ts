import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftyfiveComponent } from './home-uk-blog-onehundred-fiftyfive.component';

describe('HomeUkBlogOnehundredFiftyfiveComponent', () => {
  let component: HomeUkBlogOnehundredFiftyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
