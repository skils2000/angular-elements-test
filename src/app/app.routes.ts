import { Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { ViewerComponent } from './components/viewer/viewer.component';

export const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
];
