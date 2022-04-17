import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SuccessResponse } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loading;
  
  form = this.fb.group({
    role: ['', Validators.required],
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
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
    const { role, email, password } = this.form.value;
    this.authService.login(role, { email, password })
      .subscribe(
        (value: SuccessResponse) => {
          this.toastr.success(value.message, 'Success');
          this.router.navigate(['/', role]);
          this.loading = false;
        },
        (error) => this.loading = false
      );
  }

}
