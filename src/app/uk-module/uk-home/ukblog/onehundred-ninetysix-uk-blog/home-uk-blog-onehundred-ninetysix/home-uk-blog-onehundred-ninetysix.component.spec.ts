import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNinetysixComponent } from './home-uk-blog-onehundred-ninetysix.component';

describe('HomeUkBlogOnehundredNinetysixComponent', () => {
  let component: HomeUkBlogOnehundredNinetysixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNinetysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNinetysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNinetysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
