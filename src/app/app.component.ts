import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { GraphService } from './services/graph.service';
import { TokenService } from './services/token.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public user: Msal.User = null;
    public userInfo: any = null;
    public apiCallFailed: boolean;
    public loginFailed: boolean;
    public tokenMessage: any = 'sadas';

    constructor(private authService: AuthService,
                private graphService: GraphService,
                private tokenService: TokenService) {
    }
    
    public login() {
        this.loginFailed = false;
        this.authService.login()
            .then(user => {
                if (user) {
                    this.user = user;
                } else {
                    this.loginFailed = true;
                }
            }, () => {
                this.loginFailed = true;
            });
    }

    private callAPI() {
        this.apiCallFailed = false;
        // this.authService.getToken()
        //     .then(token => {
        //         this.graphService.getUserInfo(token)
        //             .subscribe(data => {
        //                 this.userInfo = data;
        //             }, error => {
        //                 console.error(error);
        //                 this.apiCallFailed = true;
        //             });
        //     }, error => {
        //         console.error(error);
        //         this.apiCallFailed = true;
        //     });
    }

    private logout() {
        this.authService.logout();
    }

    public async getToken(){
        //this.authService.getUser();
        this.tokenMessage = await this.tokenService.getAccessToken('this.user.displayableId');
    }
}
