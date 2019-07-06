import { Injectable } from '@angular/core';
import '../../../node_modules/msal/out/msal';
/// <reference path="../../../node_modules/msal/out/msal.d.ts" />

@Injectable()
export class AuthService {
    private applicationConfig: any = {
        clientID: 'd24d28b4-09c9-4230-a9a0-ef113169c7b2', // App id of InvoiceUI in portal (mandatory)
        authority: "https://login.microsoftonline.com/4b2c4934-c007-47dc-bff3-47eadcfa720a", //Directory Id of PremOrg
        //graphScopes: ['324234'],

    };
    private app: any;

    constructor() {
        this.app = new Msal.UserAgentApplication(
            this.applicationConfig.clientID,
            this.applicationConfig.authority, 
            () => {
            // callback for login redirect
        });
    }

    public login() {
        return this.app.loginPopup(this.applicationConfig.graphScopes)
            .then(idToken => {
                const user = this.app.getUser();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            })
            .catch(err=>{
                alert("Error:" + err);
            });
    }

    public logout() {
        this.app.logout();
    }
    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes)
            .then(accessToken => {
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                    });
            });
    }

    public getUser(){
        return this.app.getUser();
    }

    
}