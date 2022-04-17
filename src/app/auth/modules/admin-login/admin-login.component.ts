import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SuccessResponse } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loading;
  
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  hasError(control, validator = 'required', form = this.form) {
    return (
      form.get(control).hasError(validator) &&
      form.get(control).touched
    );
  }

  submit() {
    this.loading = true;
    this.authService.adminLogin(this.form.value)
      .subscribe(
        (value: SuccessResponse) => {
          this.toastr.success(value.message, 'Success');
          this.loading = false;
          this.router.navigate(['/admin'])
        },
        (error) => (this.loading = false)
      );
  }

}
