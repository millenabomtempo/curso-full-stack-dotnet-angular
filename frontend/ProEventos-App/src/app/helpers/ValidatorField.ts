import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorField {

  static MustMatch(controlName: string, matchingControlMatch: string): any {

    return (group: AbstractControl) => {

      const formGroup = group as FormGroup
      const control = formGroup.controls[controlName]
      const matchinControl = formGroup.controls[matchingControlMatch]

      if (matchinControl.errors && !matchinControl.errors['mustMatch']) {
        return null
      }

      if (control.value !== matchinControl.value) {

        matchinControl.setErrors({ mustMatch: true })

      } else {

        matchinControl.setErrors(null)

      }

      return null

    }

  }
}
