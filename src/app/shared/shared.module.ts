import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterUperCasePipe } from './pipes/first-letter-uper-case.pipe';



@NgModule({
  declarations: [FirstLetterUperCasePipe],
  imports: [
    CommonModule,
  ],
  exports : [
    FirstLetterUperCasePipe
  ]
})
export class SharedModule { }
