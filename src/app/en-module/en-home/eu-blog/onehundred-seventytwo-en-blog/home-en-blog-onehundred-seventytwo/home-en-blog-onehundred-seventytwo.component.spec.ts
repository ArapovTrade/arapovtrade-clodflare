import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventytwoComponent } from './home-en-blog-onehundred-seventytwo.component';

describe('HomeEnBlogOnehundredSeventytwoComponent', () => {
  let component: HomeEnBlogOnehundredSeventytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
