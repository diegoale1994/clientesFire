import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  error:any[];
  clientes: Cliente[];
  p: number = 1;
  constructor(private usuariosService: UsuariosService, public ngProgress: NgProgress) {
    this.ngProgress.start();
    this.usuariosService.getAllUsers().subscribe((clientes: Cliente[]) => {this.clientes = clientes; this.ngProgress.done();},
    error => this.error = error);
  }
  ngOnInit() {
  }

  eliminarUsuario(key:string, nombre:string){
   
    Swal({
      title: 'Estas seguro?',
      text: "El usuario "+nombre+ " sera eliminado !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.ngProgress.start();
        this.usuariosService.eliminarUsuario(key).subscribe(respuesta => {
          if (respuesta == null){
            this.ngProgress.done();
            delete this.clientes[key];
            Swal(
              'Eliminado!',
              'El usuario ha sido eliminado !',
              'success'
            )
          }
        });
        
      }
    })
  }

}
