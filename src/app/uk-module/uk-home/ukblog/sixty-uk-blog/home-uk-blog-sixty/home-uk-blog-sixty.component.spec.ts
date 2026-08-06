import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyComponent } from './home-uk-blog-sixty.component';

describe('HomeUkBlogSixtyComponent', () => {
  let component: HomeUkBlogSixtyComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
