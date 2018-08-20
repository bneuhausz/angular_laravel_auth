import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from '../../../Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

  constructor(private route: ActivatedRoute, private jarwis: JarwisService, private router: Router, private notify: SnotifyService) {
    route.queryParams.subscribe(
      params => {
        this.form.resetToken = params['token']
      }
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    this.jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    let _router = this.router;
    this.notify.confirm('Done. Log in with new password.', {
      buttons: [
        {
          text: 'Log in', action: data => {
            _router.navigateByUrl('/login'), this.notify.remove(data.id)
          }
        }
      ]
    });
  }

  handleError(error) {
    this.error = error.error.errors;
  }
}
