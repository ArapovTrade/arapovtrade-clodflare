import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourteenComponent } from './home-en-blog-fourteen.component';

describe('HomeEnBlogFourteenComponent', () => {
  let component: HomeEnBlogFourteenComponent;
  let fixture: ComponentFixture<HomeEnBlogFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
