import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtysixComponent } from './home-en-blog-onehundred-thirtysix.component';

describe('HomeEnBlogOnehundredThirtysixComponent', () => {
  let component: HomeEnBlogOnehundredThirtysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
