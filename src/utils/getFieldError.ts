import { FieldError } from 'react-hook-form'

export const getFieldError = (errors: any, name: string): FieldError | undefined => {
  return name.split('.').reduce((acc, part) => acc?.[part], errors)
}
