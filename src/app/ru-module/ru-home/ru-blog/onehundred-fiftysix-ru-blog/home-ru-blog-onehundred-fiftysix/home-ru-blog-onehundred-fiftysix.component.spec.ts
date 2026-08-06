import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftysixComponent } from './home-ru-blog-onehundred-fiftysix.component';

describe('HomeRuBlogOnehundredFiftysixComponent', () => {
  let component: HomeRuBlogOnehundredFiftysixComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
