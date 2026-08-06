import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTenComponent } from './home-uk-blog-ten.component';

describe('HomeUkBlogTenComponent', () => {
  let component: HomeUkBlogTenComponent;
  let fixture: ComponentFixture<HomeUkBlogTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
