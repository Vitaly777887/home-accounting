import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ShowMessageService} from '../../shared/services/show-message.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  validation_messages = {
    'email': [
      {type: 'required', message: 'Email не может быть пустым.'},
      {type: 'email', message: 'Введите корректный email.'}
    ],
    'password': [
      {type: 'required', message: 'Пароль не может быть пустым.'},
      {type: 'minlength', message: 'Минимальная длина 6 сиволов.'}

    ]
  };

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private showMessage: ShowMessageService) {
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage.show(new Message('Теперь вы можете зайти в систему', 'success'));
        } else {
          if (params['accessDenied']) {
            this.showMessage.show(new Message('Для работы с системой вам необходимо войти', 'warning'));

          }
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage.show(new Message('Пароль не верный', 'danger'));
          }
        } else {
          this.showMessage.show(new Message('Такого пользователя не существует',
            'danger'));
        }
      });
  }
}
