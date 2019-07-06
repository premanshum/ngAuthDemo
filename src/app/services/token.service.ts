import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class TokenService{
    constructor(private httpService: HttpClient){
        // Nothing interesting
    }

    public async getAccessToken(authCode){

        const headerDict = {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            // 'Access-Control-Allow-Headers': '*',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Authorization': `${authCode}`,
        }

        const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
          };

        var token = await this.httpService
                        .get<string>(`https://localhost:44321/api/token?id=localhost`, requestOptions)
                        .toPromise();
        // var token = await this.httpService
        //                 .get<string>(`https://localhost:44321/api/token?id=localhost`)
        //                 .toPromise();
        console.log(token);
        return JSON.stringify(token);
    }
}
