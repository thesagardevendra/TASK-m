import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickoutsidedirective]'
})
export class ClickoutsidedirectiveDirective {

  @Output() clickOutside = new EventEmitter<void>();
  constructor(private elementRef: ElementRef) {}
  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    console.log(clickedInside);
    this.clickOutside.emit();
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
