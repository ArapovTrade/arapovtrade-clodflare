import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFiftyFourComponent } from './home-ru-blog-fifty-four.component';

describe('HomeRuBlogFiftyFourComponent', () => {
  let component: HomeRuBlogFiftyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogFiftyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFiftyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFiftyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
