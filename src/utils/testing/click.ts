import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";

export const triggerClick = (element: DebugElement, fixture: ComponentFixture<unknown>) => {
    if(element instanceof HTMLElement) {
        element.click();
    } else {
        (element?.nativeElement as HTMLElement).click()
    }
    fixture.detectChanges();
}