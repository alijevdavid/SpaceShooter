import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { ReceipesService } from './services/recipe.service';
import { ValidationService } from './services/validation.service';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { OrderComponent } from './order/order.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AllrecipesComponent } from './allrecipes/allrecipes.component';
import { AllrecipeDetailComponent } from './allrecipes/allrecipe-detail/allrecipe-detail.component';
import { AllrecipeListComponent } from './allrecipes/allrecipe-list/allrecipe-list.component';
import { AllrecipeItemComponent } from './allrecipes/allrecipe-list/allrecipe-item/allrecipe-item.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    SearchComponent,
    FilterComponent,
    OrderComponent,
    NewRecipeComponent,
    LoginComponent,
    RegistrationComponent,
    AllrecipesComponent,
    AllrecipeDetailComponent,
    AllrecipeListComponent,
    AllrecipeItemComponent,
    EditRecipeComponent,
    DeleteRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'hu'
    })
  ],
  providers: [ReceipesService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
