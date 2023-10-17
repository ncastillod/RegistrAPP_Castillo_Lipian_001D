import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../services/registroservice.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';



function validatePasswordMatch(control: FormGroup) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmaPass');

  if (password && confirmPassword && confirmPassword.value !== password.value) {
    return { passwordMismatch: true };
  }

  return null;
}

const passwordPattern = /^.{8,}$/;

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {
  

  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};

  constructor(private menuController: MenuController,
    private registroService: RegistroserviceService,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private fb: FormBuilder) {
      this.formularioRegistro = this.fb.group({
        'nombre': new FormControl("", Validators.required),
        'correo': new FormControl("", [Validators.required, Validators.pattern(emailPattern)]),
        'password': new FormControl("", [Validators.required, Validators.pattern(passwordPattern)]), // Validar formato de contraseña
        'confirmaPass': ["", Validators.required],
        'esDocente': new FormControl(false),
        'periodoAcademico': new FormControl("2023", Validators.required),
        'semestre': new FormControl(false, Validators.required),
        'asignatura1': new FormControl(false),
        'asignatura2': new FormControl(false),
        'asignatura3': new FormControl(false),
        
      }, {validator: validatePasswordMatch});
      

  }
  
  async registrar(){
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Error en el registro',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }else {
      this.CrearUsuario();
      this.router.navigate(['inicio']);
    }
  }


  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  async CrearUsuario() {
    //console.log('Guardar');
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Debe completar todos los datos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }

    this.newUsuario.nomUsuario = form.nombre;
    this.newUsuario.correoUsuario = form.correo;
    this.newUsuario.passUsuario = form.password;
    this.newUsuario.repassUsuario = form.confirmaPass;
    this.newUsuario.esDocente = form.esDocente;
    this.newUsuario.periodoAcademico = form.periodoAcademico;
    this.newUsuario.semestre = form.semestre === '2';
    this.newUsuario.asignatura1 = form.asignatura1;
    this.newUsuario.asignatura2 = form.asignatura2;
    this.newUsuario.asignatura3 = form.asignatura3;
    this.registroService.addDatos(this.newUsuario).then(dato => {
      this.newUsuario = <Usuario>{};
      this.showToast('!Datos Agregados');
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  // Función para mostrar/ocultar casillas de verificación adicionales
  toggleAdditionalCheckboxes(event: Event) {
    const checkboxEvent = event as CustomEvent;
    const asignatura1Control = this.formularioRegistro.get('asignatura1');
    const asignatura2Control = this.formularioRegistro.get('asignatura2');
    const asignatura3Control = this.formularioRegistro.get('asignatura3');

    if (asignatura1Control && asignatura2Control && asignatura3Control) {
      if (checkboxEvent.detail.checked) {
        asignatura1Control.enable();
        asignatura2Control.enable();
        asignatura3Control.enable();
      } else {
        asignatura1Control.disable();
        asignatura2Control.disable();
        asignatura3Control.disable();
      }
    }
  }

}
