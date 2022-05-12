import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/auth/models/login';
import { LoginService } from 'src/app/auth/services/login.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  showJson = JSON.stringify({
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  }, null, 4);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let model = new Login({
      email: this.f.email.value,
      password: this.f.password.value
    })

    this.loginService.post(model).subscribe((data) => {
      this.localStorageService.setItem('token', data.token);
      this.loading = false;
      this.router.navigate(['/users'], { relativeTo: this.route });
    }, (err) => {
      this.alertService.error(err.error.error);
      this.loading = false;
    });
  }
}
