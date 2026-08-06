import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtythreeComponent } from './home-uk-blog-onehundred-thirtythree.component';

describe('HomeUkBlogOnehundredThirtythreeComponent', () => {
  let component: HomeUkBlogOnehundredThirtythreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
