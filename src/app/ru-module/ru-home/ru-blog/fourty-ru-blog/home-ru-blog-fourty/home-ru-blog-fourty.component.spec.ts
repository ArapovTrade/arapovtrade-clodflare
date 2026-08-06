import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyComponent } from './home-ru-blog-fourty.component';

describe('HomeRuBlogFourtyComponent', () => {
  let component: HomeRuBlogFourtyComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
