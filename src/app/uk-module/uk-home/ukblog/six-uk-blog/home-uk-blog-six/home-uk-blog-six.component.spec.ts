import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixComponent } from './home-uk-blog-six.component';

describe('HomeUkBlogSixComponent', () => {
  let component: HomeUkBlogSixComponent;
  let fixture: ComponentFixture<HomeUkBlogSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
