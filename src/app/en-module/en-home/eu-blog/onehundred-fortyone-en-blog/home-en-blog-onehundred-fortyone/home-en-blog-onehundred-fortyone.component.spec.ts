import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortyoneComponent } from './home-en-blog-onehundred-fortyone.component';

describe('HomeEnBlogOnehundredFortyoneComponent', () => {
  let component: HomeEnBlogOnehundredFortyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
