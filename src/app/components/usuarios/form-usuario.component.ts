import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Cliente } from './cliente';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  paises: string[];
  profesiones: string[] = ["Ingeniero", "Doctor", "Arquitecto", "Abogado", "Musico"];
  url: string;
  cliente: Cliente = new Cliente();
  constructor(private usuariosService: UsuariosService, private activatedRoute: ActivatedRoute, private route: Router,  public ngProgress: NgProgress) {
    this.usuariosService.obtenerPaises();
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.url = params['id'];
      console.log(params['id']);
      if (params['id'] != 'nuevo') {
        this.ngProgress.start();
        this.usuariosService.obtenerUsuario(params['id']).subscribe((cliente: Cliente) => {
          if (cliente == null) {
            Swal({
              type: 'error',
              title: 'No encontrado',
              text: 'El usuario que estas buscando no se encuentra en la base de datos',
              footer: '<a href>Por favor no intente hackear mi app</a>'
            })
            this.route.navigate(['usuarios/nuevo']);
          } else {
            this.ngProgress.done();
            this.cliente = cliente;
          }
        }, error => {
          console.error(error);
        });
      }
    });
  }
  cargarPais(valor: string) {
    this.paises = this.usuariosService.filtrarPais(valor);
  }
  verificarPais() {
    if (this.cliente.pais) {
      if (!this.usuariosService.verificarPais(this.cliente.pais)) {
        this.cliente.pais = "";
      }
    }
  }

  guardarCambios() {
    if (this.url == 'nuevo') {
      this.ngProgress.start();
      this.usuariosService.nuevoUsuario(this.cliente).subscribe((respuesta: clienteCreated) => {
        this.usuariosService.obtenerUsuario(respuesta.name).subscribe((cliente: Cliente) => {
          this.ngProgress.done();
          Swal({
            type: 'success',
            title: cliente.nombre,
            text: 'Creado Correctamente',
          })
          this.route.navigate(['/clientes'])
        })
      });
    } else {
      this.ngProgress.start();
      this.usuariosService.actualizarUsuario(this.cliente, this.url).subscribe((clienteActualizado:Cliente) => {
        this.ngProgress.done();
        Swal({
          type: 'success',
          title: clienteActualizado.nombre,
          text: 'Actualizado Correctamente'
        })
        this.route.navigate(['/clientes'])
      });
    }
  }
}
export interface clienteCreated {
  name: string
}
