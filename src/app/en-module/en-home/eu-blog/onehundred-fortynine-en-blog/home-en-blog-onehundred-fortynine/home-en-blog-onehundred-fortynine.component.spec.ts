import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortynineComponent } from './home-en-blog-onehundred-fortynine.component';

describe('HomeEnBlogOnehundredFortynineComponent', () => {
  let component: HomeEnBlogOnehundredFortynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
