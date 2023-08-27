import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViacepService } from './viacep.service';
import { Component } from '@angular/core';
import { CEPInterface } from './interfaces/cep.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  cepObj!: CEPInterface;
  isLoading: boolean = true;

  cepForm: FormGroup;

  constructor(private viacepService: ViacepService, private fb: FormBuilder) {
      this.cepForm = this.fb.group({
        cep: ['', [Validators.required, Validators.minLength(8)] ],
        logradouro: ['', Validators.required],
        complemento: '',
        bairro: ['', Validators.required],
        localidade: ['', Validators.required],
        uf: ['', Validators.required],
        ibge: {value: '', disabled: true},
        gia: '',
        ddd: '',
        siafi: {value: '', disabled: true}
      });
  }

  ngOnInit() {
    this.getFormFields('30160907')
  }

  getFormFields(cep:string) {
    if(!cep || cep.length < 8) {      
       return;
    }
    
    this.viacepService.getResponse(cep).subscribe((data: CEPInterface) => {
      
      this.isLoading = false;
      if(data.erro) {
        this.cepForm.controls['cep'].setErrors({cepInvalido: true})
        return;
      }

        this.cepObj = data;
  
        this.cepForm.patchValue( {
          cep: this.cepObj.cep,
          logradouro: this.cepObj.logradouro,
          complemento: this.cepObj.complemento,
          bairro: this.cepObj.bairro,
          localidade: this.cepObj.localidade,
          uf: this.cepObj.uf,
          ibge: this.cepObj.ibge,
          gia: this.cepObj.gia,
          ddd: this.cepObj.ddd,
          siafi: this.cepObj.siafi
        })

    })
  }

  handleSave() {    
    if(this.cepForm.invalid){
      return;
    }

    this.viacepService.getResponse(this.cepForm.get('cep')?.value).subscribe((data: CEPInterface) => {
      if (data.erro) {
        this.cepForm.controls['cep'].setErrors({cepInvalido: true})
        return;
      }

    // Valid CEP, save data to localStorage
    localStorage.setItem('cep', this.cepForm.get('cep')?.value);
    localStorage.setItem('logradouro', this.cepForm.get('logradouro')?.value);
    localStorage.setItem('complemento', this.cepForm.get('complemento')?.value);
    localStorage.setItem('bairro', this.cepForm.get('bairro')?.value);
    localStorage.setItem('localidade', this.cepForm.get('localidade')?.value);
    localStorage.setItem('uf', this.cepForm.get('uf')?.value);
    localStorage.setItem('ibge', this.cepForm.get('ibge')?.value);
    localStorage.setItem('gia', this.cepForm.get('gia')?.value);
    localStorage.setItem('ddd', this.cepForm.get('ddd')?.value);
    localStorage.setItem('siafi', this.cepForm.get('siafi')?.value);
  });
    
}

}
