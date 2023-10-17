import { Component } from '@angular/core';

interface Componente{
  name:string;
  icon:string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  componentes : Componente[]=[
    {
      name:'Inicio',
      icon: 'home-outline',
      redirecTo:'/inicio'   
    },
    {
      name:'Sobre la App',
      icon: 'cafe-outline',
      redirecTo:'/card'   
    },
    {
      name:'Registrate',
      icon: 'attach-outline',
      redirecTo:'/registro'   
    },
    {
      name:'Login',
      icon: 'person-outline',
      redirecTo: '/login'
    }
     
    
     
  ];


  constructor() {}
  onClick(){
    
  }
}

