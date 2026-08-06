import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftynineComponent } from './home-ru-blog-onehundred-fiftynine.component';

describe('HomeRuBlogOnehundredFiftynineComponent', () => {
  let component: HomeRuBlogOnehundredFiftynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
