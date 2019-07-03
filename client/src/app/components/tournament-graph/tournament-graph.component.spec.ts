import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentGraphComponent } from './tournament-graph.component';

describe('TournamentGraphComponent', () => {
  let component: TournamentGraphComponent;
  let fixture: ComponentFixture<TournamentGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
