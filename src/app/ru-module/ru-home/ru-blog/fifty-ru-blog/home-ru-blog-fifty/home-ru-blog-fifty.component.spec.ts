import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyComponent } from './home-ru-blog-fifty.component';

describe('HomeRuBlogFiftyComponent', () => {
  let component: HomeRuBlogFiftyComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
