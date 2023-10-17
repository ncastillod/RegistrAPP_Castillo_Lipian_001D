import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Componente {
  name: string;
  icon: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  componentes: Componente[] = [
    {
      name: 'Inicio',
      icon: 'home-outline',
      redirecTo: '/inicio'
    },
    {
      name: 'Sobre la App',
      icon: 'cafe-outline',
      redirecTo: '/card'
    },
    {
      name: 'Login',
      icon: 'person-outline',
      redirecTo: '/login'
    },
    {
      name: 'Registrate',
      icon: 'attach-outline',
      redirecTo: '/registro'
    },
   

  ]
  metodo(){
    if (localStorage.getItem("ingresado")){
    return this.componentes.filter(c =>{
      return !(c.name == "Registrate" || c.name == "Login")
    })
    
    }else{
      return this.componentes
    }
  }


  constructor(
    private router: Router
  ) { }
  onClick() {
    this.router.navigate(['inicio'])
    localStorage.clear()
  }
}

