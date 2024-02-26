import {UserLoginReponseViewModel} from './user-login-reponse-view-model'

export class UserSessionModel {
    flag: boolean = false;
    value: UserLoginReponseViewModel | undefined;
    msg: string = '';
}
