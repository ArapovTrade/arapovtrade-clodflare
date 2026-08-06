import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetysixComponent } from './home-en-blog-onehundred-ninetysix.component';

describe('HomeEnBlogOnehundredNinetysixComponent', () => {
  let component: HomeEnBlogOnehundredNinetysixComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetysixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
