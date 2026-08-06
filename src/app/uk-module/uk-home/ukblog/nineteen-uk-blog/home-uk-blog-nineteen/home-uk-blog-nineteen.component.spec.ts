import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNineteenComponent } from './home-uk-blog-nineteen.component';

describe('HomeUkBlogNineteenComponent', () => {
  let component: HomeUkBlogNineteenComponent;
  let fixture: ComponentFixture<HomeUkBlogNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
