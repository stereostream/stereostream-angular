import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export class ForNumberContext {
  constructor(public count: number, public index: number) { }

  get first(): boolean { return this.index === 0; }

  get last(): boolean { return this.index === this.count - 1; }

  get even(): boolean { return this.index % 2 === 0; }

  get odd(): boolean { return !this.even; }
}

/* tslint:disable:directive-selector */
@Directive({
  selector: '[ForNumber]'
})
export class ForNumberDirective {
  constructor(private _template: TemplateRef<ForNumberContext>,
              private _viewContainer: ViewContainerRef) { }

  private _forNumberOf: number;

  @Input()
  set forNumberOf(n: number) {
    this._forNumberOf = n;
    this.generate();
  }

  @Input()
  set ngForTemplate(value: TemplateRef<ForNumberContext>) {
    if (value) {
      this._template = value;
    }
  }

  private generate() {
    for (let i = 0; i < this._forNumberOf; i++) {
      this._viewContainer.createEmbeddedView(this._template, new ForNumberContext(this._forNumberOf, i));
    }
  }
}
