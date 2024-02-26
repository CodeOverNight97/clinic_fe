import { AuthService } from '../services/auth.service';

export function appInitializer(authService: AuthService) {
    if(window.location.pathname.includes('/open-gate')){
        return () => {
            console.log('Open Gate');
        };
    }

    return () => new Promise((resolve: any) => {
        authService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}
