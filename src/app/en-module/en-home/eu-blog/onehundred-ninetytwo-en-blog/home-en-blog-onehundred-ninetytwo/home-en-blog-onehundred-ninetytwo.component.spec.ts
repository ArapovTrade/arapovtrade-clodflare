import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetytwoComponent } from './home-en-blog-onehundred-ninetytwo.component';

describe('HomeEnBlogOnehundredNinetytwoComponent', () => {
  let component: HomeEnBlogOnehundredNinetytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
