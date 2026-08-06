import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftytwoComponent } from './home-uk-blog-onehundred-fiftytwo.component';

describe('HomeUkBlogOnehundredFiftytwoComponent', () => {
  let component: HomeUkBlogOnehundredFiftytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
