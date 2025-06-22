import React from 'react'
import { Controller, Control, FieldError } from 'react-hook-form'
import { Form } from 'react-bootstrap'

interface InputFieldProps {
  name: string
  label: string
  type?: string
  disabled?: boolean
  control: Control<any>
  error?: FieldError
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  disabled = false,
  control,
  error,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Control {...field} type={type} isInvalid={!!error} disabled={disabled} />
        )}
      />
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default InputField
