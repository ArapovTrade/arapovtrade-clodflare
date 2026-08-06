import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortytwoComponent } from './home-uk-blog-onehundred-fortytwo.component';

describe('HomeUkBlogOnehundredFortytwoComponent', () => {
  let component: HomeUkBlogOnehundredFortytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
