import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtyoneComponent } from './home-en-blog-onehundred-sixtyone.component';

describe('HomeEnBlogOnehundredSixtyoneComponent', () => {
  let component: HomeEnBlogOnehundredSixtyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
