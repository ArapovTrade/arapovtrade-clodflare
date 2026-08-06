import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyFiveComponent } from './home-uk-blog-fifty-five.component';

describe('HomeUkBlogFiftyFiveComponent', () => {
  let component: HomeUkBlogFiftyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
