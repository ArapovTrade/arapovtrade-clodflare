import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNineteenComponent } from './home-ru-blog-nineteen.component';

describe('HomeRuBlogNineteenComponent', () => {
  let component: HomeRuBlogNineteenComponent;
  let fixture: ComponentFixture<HomeRuBlogNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
