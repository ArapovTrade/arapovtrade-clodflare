import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftynineComponent } from './home-uk-blog-onehundred-fiftynine.component';

describe('HomeUkBlogOnehundredFiftynineComponent', () => {
  let component: HomeUkBlogOnehundredFiftynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
