import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <dialog class="modal" [class.modal-open]="showModal()">
      <div class="modal-box prose">
        <h3 class="text-secondary">{{title()}}</h3>
        @if(description()) {
          <p>{{description()}}</p>
        }
        <div class="modal-action">
          <button (click)="cancelClick.emit()" custom-btn variant="outlined">No</button>
          <button (click)="okClick.emit()" custom-btn variant="primary" class="">Yes</button>
        </div>
      </div>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  showModal = input.required();

  title = input.required();
  description = input();

  cancelClick = output<void>();
  okClick = output<void>();
}
