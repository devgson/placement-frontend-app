import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SuccessResponse } from 'src/app/shared/services/auth.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private subs = new SubSink();

  loading;
  form = this.fb.group({
    fullName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, this.phoneValidator()]],
    email: ['', [Validators.required, this.emailValidator()]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    universityId: ['', Validators.required],
  }, {
    validators: [
      this.passwordValidator('password', 'confirmPassword')
    ],
  });

  studentForm = this.fb.group({
    course: ['', Validators.required],
    currentLevel: ['', Validators.required],
  })

  tutorForm = this.fb.group({
    position: ['', Validators.required],
  });

  registerAs = 'student';

  controlValue(control, form = this.form) {
    return form.get(control).value;
  }

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.route.queryParams.subscribe((param) => {
      const registerAs = param['as'];
      if (registerAs !== 'student' && registerAs !== 'tutor') return;
      this.registerAs = registerAs;
    })
  }

  hasError(control, validator = 'required', form = this.form) {
    return (
      form.get(control).hasError(validator) &&
      form.get(control).touched
    );
  }

  phoneValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber: string = control.value;
      if (!phoneNumber) return null;
      const isValidNumber = phoneNumber.startsWith('+44') && phoneNumber.length === 13;
      return isValidNumber ? null : { invalidPhoneNumber: true };
    };
  }

  emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (!email) return null;
      const isValidEmail = email.endsWith('.le.ac.uk');
      return isValidEmail ? null : { invalidEmail: true };
    };
  }

  passwordValidator(passwordControl, confirmPasswordControl) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password = formGroup.get(passwordControl)?.value;
      const confirmPassword = formGroup.get(confirmPasswordControl)?.value;
      if (!password || !confirmPassword) return null;
      return password !== confirmPassword
        ? { invalidPassword: true }
        : null;
    };
  }

  isInvalid() {
    const form = this.registerAs === 'student' ? this.studentForm : this.tutorForm;
    return form.invalid || this.form.invalid;
  }

  uploadFile(file) {
    const singleFile: File = file.files[0];
    this.form.patchValue({ universityId: singleFile });
  }

  removeFile() {
    this.form.patchValue({ universityId: '' });
  }

  submit() {
    this.loading = true;
    const form = this.registerAs === 'student' ? this.studentForm : this.tutorForm;
    const formValue = { ...this.form.value, ...form.value };
    delete formValue.confirmPassword;
    let formData: any = new FormData();
    Object.keys(formValue).forEach(key => {
      formData.append(key,  formValue[key]);
    });
    this.authService.register(this.registerAs, formData)
      .subscribe(
        (value: SuccessResponse) => {
          this.toastr.success(
            'An admin will review your registration and approve or reject',
            value.message
          );
          this.router.navigate(['/auth/login']);
          this.loading = false;
        },
        (error) => (this.loading = false)
      );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
