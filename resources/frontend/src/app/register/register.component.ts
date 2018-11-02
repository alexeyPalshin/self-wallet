import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from "../services";
import { first } from 'rxjs/operators';
import { PasswordValidator } from "../validators";
import { MatDialog } from '@angular/material';
import { RegistrationDialogComponent } from "../dialogs/registration-dialog/registration-dialog.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      public dialog: MatDialog
      ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      // group for password confirmation
      matchingPasswordsGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required]
      }, (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup)
      })
    });
  }



  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              // this.alertService.success('Registration successful', true);
              // this.router.navigate(['/login']);
            },
            error => {
              // this.alertService.error(error);
              this.loading = false;
            });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      data: {name: 'name', animal: 'animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
