import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventynineComponent } from './home-en-blog-onehundred-seventynine.component';

describe('HomeEnBlogOnehundredSeventynineComponent', () => {
  let component: HomeEnBlogOnehundredSeventynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
