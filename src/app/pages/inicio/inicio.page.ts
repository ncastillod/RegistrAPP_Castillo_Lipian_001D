import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  data: { data: any[] } = { data: [] };

  constructor(private menuController: MenuController, private apiService: ApiService) {}

  ngOnInit() {
    this.llenarData();
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  llenarData() {
    this.apiService.getData().subscribe((response) => {
      this.data = response; // Asigna la respuesta a la propiedad data
    });
  }

  getDayFromDate(dateString: string): string {
    const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }

  isCurrentMonthFeriado(dateString: string): boolean {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const date = new Date(dateString);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }
  escanearCodigoQR() {
    // Lógica de escaneo de código QR (puede estar vacía para un marcador de posición).
  }

}
