import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private translate: TranslateService, public userService : UserService) {}

  switchLanguage(lang: string){
    this.translate.use(lang);
  }

  logout(){
    window.location.reload();
  }
  
}
