import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombineLatestComponent } from './components/combine-latest/combine-latest.component';
import { DataStoreComponent } from './components/data-store/data-store.component';
import { MemoryLeakedComponent } from './components/memory-leaked/memory-leaked.component';
import { MergeMapComponent } from './components/merge-map/merge-map.component';
import { EasyComponent } from './components/easy/easy.component';

const routes: Routes = [
  { path: '', redirectTo: '/easy', pathMatch: 'full' },
  { path: 'easy', component: EasyComponent },
  { path: 'medium', component: CombineLatestComponent },
  { path: 'hard', component: MemoryLeakedComponent },
  { path: 'extream', component: MergeMapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
