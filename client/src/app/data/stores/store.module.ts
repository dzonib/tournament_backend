import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { mainReducer } from "./main-store/reducer";
import { EffectsModule } from "@ngrx/effects";
import { MainEffect } from "./main-store/effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("mainState", mainReducer),
    EffectsModule.forFeature([MainEffect])
  ],
  providers: []
})
export class DataModule {}
