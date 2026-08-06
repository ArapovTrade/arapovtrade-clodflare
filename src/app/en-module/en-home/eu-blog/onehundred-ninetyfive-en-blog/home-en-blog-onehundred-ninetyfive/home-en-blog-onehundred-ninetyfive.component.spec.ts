import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetyfiveComponent } from './home-en-blog-onehundred-ninetyfive.component';

describe('HomeEnBlogOnehundredNinetyfiveComponent', () => {
  let component: HomeEnBlogOnehundredNinetyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
