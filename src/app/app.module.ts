import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar.component';
import { HomeComponent } from './home.component';
import { SearchResultComponent } from './search-result.component';
import { InstructionComponent } from './instruction.component';
import { BuilderComponent } from './builder.component';
import { AdminComponent } from './admin.component';

import { InstructionService } from './instruction.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    SearchResultComponent,
    InstructionComponent,
    BuilderComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    InstructionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
