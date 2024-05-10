import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { AllrecipesComponent } from './allrecipes/allrecipes.component';
import { AllrecipeDetailComponent } from './allrecipes/allrecipe-detail/allrecipe-detail.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';


const routes: Routes = [
  { path: '',   redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'login', component:  LoginComponent},
  { path: 'registration', component:  RegistrationComponent},
  {
    path: 'allrecipes',
    component: AllrecipesComponent,
    children: [
      {
        path: 'detail/:id',
        component: AllrecipeDetailComponent,
      }
    ],
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: 'detail/:id',
        component: RecipeDetailComponent,
      }
    ],
  },
  { path: 'recipes/new', component:  NewRecipeComponent},
  { path: 'recipes/delete/:id', component:  DeleteRecipeComponent},
  { path: 'recipes/edit/:id', component:  EditRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
