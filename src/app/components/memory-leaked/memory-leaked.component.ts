import { Component } from '@angular/core';

@Component({
  selector: 'parent-leaked',
  template: `
    <div class="container">
      <h2 class="mb-5">Memory Leaked - example</h2>
      <button
        class="btn btn-primary mr-1"
        (click)="relive()"
        style="margin-right: 10px;"
      >
        Show live component
      </button>
      <button class="btn btn-danger" (click)="destroy()">
        Hide live component
      </button>
      <app-child-memory-leaked *ngIf="goLive"></app-child-memory-leaked>
    </div>
  `
})
export class MemoryLeakedComponent {
  goLive = false;
  constructor() {}

  destroy() {
    this.goLive = false;
  }

  public relive() {
    this.goLive = true;
  }
}
