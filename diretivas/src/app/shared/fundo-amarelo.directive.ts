import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[appFundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // Forma não recomendada por ter brechas de segurança
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';

    // Forma recomendada
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'yellow')
   }

}
