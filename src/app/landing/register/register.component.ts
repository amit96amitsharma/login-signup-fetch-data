import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from 'src/app/auth/models/register';
import { RegisterService } from 'src/app/auth/services/register.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  showJson = JSON.stringify({
    "email": "eve.holt@reqres.in",
    "password": "pistol"
  }, null, 4);

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let model = new Register({
      email: this.f.email.value,
      password: this.f.password.value
    });

    this.registerService.post(model).subscribe(() => {
      this.alertService.success('Registration successful', { keepAfterRouteChange: true });
      this.router.navigate(['/landing'], { relativeTo: this.route });
    }, (err) => {
      this.alertService.error(err.error.error);
      this.loading = false;
    })
  }
}
