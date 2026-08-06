import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftyfiveComponent } from './home-ru-blog-onehundred-fiftyfive.component';

describe('HomeRuBlogOnehundredFiftyfiveComponent', () => {
  let component: HomeRuBlogOnehundredFiftyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
