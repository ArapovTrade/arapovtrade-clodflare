import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortyoneComponent } from './home-uk-blog-onehundred-fortyone.component';

describe('HomeUkBlogOnehundredFortyoneComponent', () => {
  let component: HomeUkBlogOnehundredFortyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
