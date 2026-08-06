import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTenComponent } from './home-en-blog-ten.component';

describe('HomeEnBlogTenComponent', () => {
  let component: HomeEnBlogTenComponent;
  let fixture: ComponentFixture<HomeEnBlogTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
