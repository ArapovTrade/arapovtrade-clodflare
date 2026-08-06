import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftytwoComponent } from './home-ru-blog-onehundred-fiftytwo.component';

describe('HomeRuBlogOnehundredFiftytwoComponent', () => {
  let component: HomeRuBlogOnehundredFiftytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
