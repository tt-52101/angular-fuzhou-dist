
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book.component';

const routes: Routes = [
{ path: 'book', component: BookComponent, data: { permission: 'Pages.Books.Book' }, },

{
    path: '**',
    redirectTo: 'book',
},];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }
