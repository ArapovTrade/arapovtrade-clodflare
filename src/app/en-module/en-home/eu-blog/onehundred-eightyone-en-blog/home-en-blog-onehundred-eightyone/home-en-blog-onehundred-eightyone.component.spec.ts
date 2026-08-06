import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightyoneComponent } from './home-en-blog-onehundred-eightyone.component';

describe('HomeEnBlogOnehundredEightyoneComponent', () => {
  let component: HomeEnBlogOnehundredEightyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
