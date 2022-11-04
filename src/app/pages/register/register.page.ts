import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }
  horizontalStepperForm = new FormGroup({
    code_agent: new FormControl('', Validators.required),
  })
  ngOnInit() {
  }

  obtenerCodigoAgente(){
    const {code_agent}=this.horizontalStepperForm.value
    if(code_agent.length>0){
      localStorage.setItem("code_agent",code_agent)
    }
    this.router.navigate(['/register-form']);
  }

}
