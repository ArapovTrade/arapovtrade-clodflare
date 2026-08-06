import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortytwoComponent } from './home-en-blog-onehundred-fortytwo.component';

describe('HomeEnBlogOnehundredFortytwoComponent', () => {
  let component: HomeEnBlogOnehundredFortytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
