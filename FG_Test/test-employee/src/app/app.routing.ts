import { EmployeeFormComponent } from './employees/component/employee-form/employee-form.component';
import { environment } from '../environments/environment';
import { Route, RouterModule } from '@angular/router';

const routesConfig: Route[] = [
    { path: '**', redirectTo: 'employees' },
]

export const routerModule = RouterModule.forRoot(routesConfig, {
    enableTracing: environment.enableTracing,
    useHash: true
})
