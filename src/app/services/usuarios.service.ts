import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Cliente } from '../components/usuarios/cliente';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private Url = "https://clientes-bd090.firebaseio.com/Clientes.json";
  private urlUsuario = "https://clientes-bd090.firebaseio.com/Clientes/";
  private UrlCountryes = "https://restcountries.eu/rest/v2/all";
  constructor(private http: HttpClient) { }
  paises = new Array();
  capitales = new Array();
  getAllUsers() {
    return this.http.get(this.Url).pipe(map(usuarios => {
      return this.reverseObject(usuarios);
    }));
  }

  obtenerPaises() {
    this.http.get(this.UrlCountryes).pipe(map(data => {
      let pais = new Array();
      for (let index in data) {
        pais.push(data[index].name);
        this.capitales.push(data[index].capital);
      }
      return Array.of(pais);
    })).subscribe(paises => {
      this.paises = paises[0];
    })
  }

  filtrarPais(termino: string) {
    termino = termino.toLowerCase();
    let pais = new Array();
    for (let i = 0; i < this.paises.length; i++) {
      if (this.paises[i].toLowerCase().indexOf(termino) >= 0) {
        if (pais.length < 4) {
          pais.push(this.paises[i]);
        }

      }
    }
    return pais;
  }

  verificarPais(pais: string): boolean {
    pais = pais.toLowerCase();
    for (let i = 0; i < this.paises.length; i++) {
      if (this.paises[i].toLowerCase() == pais) {
        return true;
      }
    }
    return false;
  }

  obtenerUsuario(key: string) {
    return this.http.get(this.urlUsuario + key + ".json");
  }

  nuevoUsuario(usuario: Cliente) {
    let body = JSON.stringify(usuario);
    let headers = new HttpHeaders({
      'Content-Type': 'applcation/json'
    });
    return this.http.post(this.Url, body, { headers });
  }

  actualizarUsuario(usuario: Cliente, key:string) {
    let body = JSON.stringify(usuario);
    let headers = new HttpHeaders({
      'Content-Type': 'applcation/json'
    });
    return this.http.put(this.urlUsuario+key+".json", body, { headers });
  }

  eliminarUsuario(key:string){
    return this.http.delete(this.urlUsuario+key+".json");
  }

  reverseObject(object) {
    var newObject = {};
    var keys = [];

    for (var key in object) {
        keys.push(key);
    }

    for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]]= value;
    }       

    return newObject;
}
}
