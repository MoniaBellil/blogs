import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListALLComponent } from './list-all/list-all.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListALLComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
