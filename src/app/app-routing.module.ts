import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home.component';
import { SearchResultComponent }      from './search-result.component';
import { InstructionComponent }  from './instruction.component';
import { BuilderComponent } from './builder.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'search-result/:query', component: SearchResultComponent },
  { path: 'instruction/:id', component: InstructionComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
