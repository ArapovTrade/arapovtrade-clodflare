import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftynineComponent } from './home-en-blog-onehundred-fiftynine.component';

describe('HomeEnBlogOnehundredFiftynineComponent', () => {
  let component: HomeEnBlogOnehundredFiftynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
