import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetyfourComponent } from './home-en-blog-onehundred-ninetyfour.component';

describe('HomeEnBlogOnehundredNinetyfourComponent', () => {
  let component: HomeEnBlogOnehundredNinetyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
