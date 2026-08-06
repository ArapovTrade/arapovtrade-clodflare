import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortyoneComponent } from './home-ru-blog-onehundred-fortyone.component';

describe('HomeRuBlogOnehundredFortyoneComponent', () => {
  let component: HomeRuBlogOnehundredFortyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
