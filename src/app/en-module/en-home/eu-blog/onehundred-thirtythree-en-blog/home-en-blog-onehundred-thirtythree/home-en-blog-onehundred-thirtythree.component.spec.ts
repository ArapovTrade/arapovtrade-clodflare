import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtythreeComponent } from './home-en-blog-onehundred-thirtythree.component';

describe('HomeEnBlogOnehundredThirtythreeComponent', () => {
  let component: HomeEnBlogOnehundredThirtythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
