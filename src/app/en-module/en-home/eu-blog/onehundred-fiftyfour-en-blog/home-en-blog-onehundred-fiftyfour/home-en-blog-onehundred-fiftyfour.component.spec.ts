import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftyfourComponent } from './home-en-blog-onehundred-fiftyfour.component';

describe('HomeEnBlogOnehundredFiftyfourComponent', () => {
  let component: HomeEnBlogOnehundredFiftyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
