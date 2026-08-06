import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtySixComponent } from './home-en-blog-fourty-six.component';

describe('HomeEnBlogFourtySixComponent', () => {
  let component: HomeEnBlogFourtySixComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
