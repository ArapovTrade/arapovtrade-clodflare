import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogEightyComponent } from './home-ru-blog-eighty.component';

describe('HomeRuBlogEightyComponent', () => {
  let component: HomeRuBlogEightyComponent;
  let fixture: ComponentFixture<HomeRuBlogEightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogEightyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
