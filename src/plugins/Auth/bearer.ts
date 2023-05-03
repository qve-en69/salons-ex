// @ts-nocheck
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {RouterNameEnum} from "@/router/router.types";

export default {
    request: function (req: AxiosRequestConfig, token: string): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.http.setHeaders.call(this, req, {
            Authorization: 'Bearer ' + token,
        });

        console.log(token);
    },

    response: function (res: AxiosResponse): void | string {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if(res.status == 401){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            this.logout({ redirect: { name: RouterNameEnum.AuthLogin } });
        }else{
            return res.data.token;
        }
        
        //const headers = this.http.getHeaders.call(this, res);
        //let token = headers.Authorization || headers.authorization;

        /*console.log(res);

        if (token === undefined && res.data !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            token = res.data.token;
        }*/

        /*if (token) {
            token = token.split(/Bearer:?\s?/i);

            return token[token.length > 1 ? 1 : 0].trim();
        }*/
    },
};
