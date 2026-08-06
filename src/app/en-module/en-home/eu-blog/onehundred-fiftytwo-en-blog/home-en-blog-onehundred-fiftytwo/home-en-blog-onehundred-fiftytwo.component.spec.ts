import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftytwoComponent } from './home-en-blog-onehundred-fiftytwo.component';

describe('HomeEnBlogOnehundredFiftytwoComponent', () => {
  let component: HomeEnBlogOnehundredFiftytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
