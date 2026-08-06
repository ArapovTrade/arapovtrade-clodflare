import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtysixComponent } from './home-ru-blog-onehundred-thirtysix.component';

describe('HomeRuBlogOnehundredThirtysixComponent', () => {
  let component: HomeRuBlogOnehundredThirtysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
