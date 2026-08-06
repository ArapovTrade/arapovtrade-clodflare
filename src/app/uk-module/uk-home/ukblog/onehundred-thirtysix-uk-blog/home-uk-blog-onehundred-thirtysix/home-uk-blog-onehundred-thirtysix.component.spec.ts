import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtysixComponent } from './home-uk-blog-onehundred-thirtysix.component';

describe('HomeUkBlogOnehundredThirtysixComponent', () => {
  let component: HomeUkBlogOnehundredThirtysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
