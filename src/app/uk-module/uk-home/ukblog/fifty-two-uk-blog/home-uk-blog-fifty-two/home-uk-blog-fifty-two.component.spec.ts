import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFiftyTwoComponent } from './home-uk-blog-fifty-two.component';

describe('HomeUkBlogFiftyTwoComponent', () => {
  let component: HomeUkBlogFiftyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogFiftyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFiftyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFiftyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
