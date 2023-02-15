import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-child-memory-leaked',
  templateUrl: './child-memory-leaked.component.html',
  styleUrls: ['./child-memory-leaked.component.css'],
})
export class ChildMemoryLeakedComponent implements OnInit, OnDestroy {
  componentId: number;
  public counter: number;
  public counterSubscription: Subscription;

  ngOnInit() {
    this.componentId = new Date().getTime();
    this.counterSubscription = timer(0, 1000)
      .pipe(
        tap((counter) => {
          console.log(`Counter ${this.componentId} ${counter}`);
        })
      )
      .subscribe((counter) => {
        this.counter = counter;
      });
  }

  ngOnDestroy() {
    // this.counterSubscription.unsubscribe();
    console.log(`Counter ${this.componentId} oprit la ${this.counter}`);
  }
}
