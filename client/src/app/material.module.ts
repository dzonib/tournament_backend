import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatToolbarModule],
  exports: [MatInputModule, MatButtonModule, MatToolbarModule]
})
export class MaterialModule {}
