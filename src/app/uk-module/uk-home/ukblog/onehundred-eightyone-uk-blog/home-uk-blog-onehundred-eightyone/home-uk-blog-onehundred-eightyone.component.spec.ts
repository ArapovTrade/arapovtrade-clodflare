import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightyoneComponent } from './home-uk-blog-onehundred-eightyone.component';

describe('HomeUkBlogOnehundredEightyoneComponent', () => {
  let component: HomeUkBlogOnehundredEightyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
