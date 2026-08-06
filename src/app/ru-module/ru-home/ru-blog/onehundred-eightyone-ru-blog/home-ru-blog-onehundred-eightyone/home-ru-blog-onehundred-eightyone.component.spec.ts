import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightyoneComponent } from './home-ru-blog-onehundred-eightyone.component';

describe('HomeRuBlogOnehundredEightyoneComponent', () => {
  let component: HomeRuBlogOnehundredEightyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
