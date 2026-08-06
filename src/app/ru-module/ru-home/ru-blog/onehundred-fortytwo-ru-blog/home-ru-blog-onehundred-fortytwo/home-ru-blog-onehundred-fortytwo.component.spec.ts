import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortytwoComponent } from './home-ru-blog-onehundred-fortytwo.component';

describe('HomeRuBlogOnehundredFortytwoComponent', () => {
  let component: HomeRuBlogOnehundredFortytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
