import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetynineComponent } from './home-en-blog-onehundred-ninetynine.component';

describe('HomeEnBlogOnehundredNinetynineComponent', () => {
  let component: HomeEnBlogOnehundredNinetynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
