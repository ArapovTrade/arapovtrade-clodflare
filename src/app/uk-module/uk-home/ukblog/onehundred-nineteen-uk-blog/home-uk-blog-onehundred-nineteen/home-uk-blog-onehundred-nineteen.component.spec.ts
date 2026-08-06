import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNineteenComponent } from './home-uk-blog-onehundred-nineteen.component';

describe('HomeUkBlogOnehundredNineteenComponent', () => {
  let component: HomeUkBlogOnehundredNineteenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
