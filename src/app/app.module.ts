import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosService } from './services/usuarios.service';
import { HttpClientModule } from '@angular/common/http';

import { KeysPipe } from './pipes/keys.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormUsuarioComponent } from './components/usuarios/form-usuario.component';
import {FormsModule} from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    KeysPipe,
    FormUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    SweetAlert2Module,
    NgProgressModule
  ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
