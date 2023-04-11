import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnakeCardContainerComponent } from './components/snake-card-container/snake-card-container.component';
import { SnakePageComponent } from './components/snake-page/snake-page.component';

const routes: Routes = [
  {
    path: '',
    component: SnakeCardContainerComponent,
    pathMatch: 'full',
  },
  {
    path: 'snakes/:id',
    component: SnakePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
