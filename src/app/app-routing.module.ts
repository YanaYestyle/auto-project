import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";


import { MainComponent } from './components/main/main.component';
import { StarterComponent } from './components/starter/starter.component';

const routes: Routes = [
  { path: "", redirectTo: "starter", pathMatch: "full" },
  { path: "starter", component: StarterComponent },
  { path: "main", component: MainComponent },
  { path: "main/:id", component: MainComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
