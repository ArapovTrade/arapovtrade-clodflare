import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNineteenComponent } from './home-en-blog-nineteen.component';

describe('HomeEnBlogNineteenComponent', () => {
  let component: HomeEnBlogNineteenComponent;
  let fixture: ComponentFixture<HomeEnBlogNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
