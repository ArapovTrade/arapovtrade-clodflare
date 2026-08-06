import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortynineComponent } from './home-uk-blog-onehundred-fortynine.component';

describe('HomeUkBlogOnehundredFortynineComponent', () => {
  let component: HomeUkBlogOnehundredFortynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
