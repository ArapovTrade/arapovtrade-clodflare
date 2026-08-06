import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixComponent } from './home-en-blog-six.component';

describe('HomeEnBlogSixComponent', () => {
  let component: HomeEnBlogSixComponent;
  let fixture: ComponentFixture<HomeEnBlogSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
