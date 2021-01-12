import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {QueueComponent} from './queue/queue.component';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'queue',
        component: QueueComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {
}
