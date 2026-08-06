import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourteenComponent } from './home-uk-blog-fourteen.component';

describe('HomeUkBlogFourteenComponent', () => {
  let component: HomeUkBlogFourteenComponent;
  let fixture: ComponentFixture<HomeUkBlogFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
