"use client"

import DatePicker from "@app/components/DatePicker/DatePicker"
import SelectField, { type SelectFieldOption } from "@app/components/SelectField/SelectField"
import TextField from "@app/components/TextField/TextField"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import dayjs from "dayjs"
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form"

export type FieldConfig<T extends FieldValues> = {
  name: FieldPath<T>
  label: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: FieldPathValue<T, FieldPath<T>>
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, "disabled" | "valueAsDate" | "valueAsNumber" | "setValueAs">
} & (
  | { type: "text"; multiline?: boolean; minRows?: number }
  | { type: "password" | "date" | "number" }
  | { type: "select"; options: readonly SelectFieldOption[] }
)

export type FormRowConfig<T extends FieldValues> = {
  fields: readonly [FieldConfig<T>, ...FieldConfig<T>[]]
}

export type FormFieldsProps<T extends FieldValues> = {
  control: Control<T>
  configs: readonly FormRowConfig<T>[]
}

function FormField<T extends FieldValues>({ control, config }: { control: Control<T>; config: FieldConfig<T> }) {
  return (
    <Controller
      name={config.name}
      rules={{
        ...config.rules,
        required: config.rules?.required ?? (config.required ? "Required" : false),
      }}
      control={control}
      disabled={config.disabled}
      defaultValue={config.defaultValue ?? ("" as FieldPathValue<T, FieldPath<T>>)}
      render={({ field, fieldState }) => {
        const common = {
          name: field.name,
          label: config.label,
          disabled: field.disabled,
          required: config.required,
        }

        if (config.type === "date") {
          const date = field.value ? dayjs(field.value) : null
          return (
            <DatePicker
              name={field.name}
              label={config.label}
              value={date}
              disabled={field.disabled}
              onChange={(value) => field.onChange(value?.isValid() ? value.format("YYYY-MM-DD") : "")}
              slotProps={{
                textField: {
                  onBlur: field.onBlur,
                  inputRef: field.ref,
                  required: config.required,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message ?? config.helperText,
                },
              }}
            />
          )
        }

        const input = {
          ...common,
          value: field.value ?? "",
          onBlur: field.onBlur,
          onChange: field.onChange,
          inputRef: field.ref,
          error: !!fieldState.error,
          helperText: fieldState.error?.message ?? config.helperText,
        }

        if (config.type === "select") {
          return (
            <SelectField
              {...input}
              options={config.options}
            />
          )
        }

        if (config.type === "number") {
          return (
            <TextField
              {...input}
              type="number"
              onChange={(event) => {
                const value = event.target.value
                field.onChange(value === "" ? "" : Number(value))
              }}
            />
          )
        }

        return (
          <TextField
            {...input}
            type={config.type}
            minRows={config.type === "text" ? config.minRows : undefined}
            multiline={config.type === "text" ? config.multiline : undefined}
          />
        )
      }}
    />
  )
}

export default function FormFields<T extends FieldValues>({ control, configs }: FormFieldsProps<T>) {
  return (
    <Stack gap={2}>
      {configs.map(({ fields }) => (
        <Box
          key={fields.map((field) => field.name).join(":")}
          sx={{
            gap: 2,
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: `repeat(${fields.length}, minmax(0, 1fr))` },
          }}
        >
          {fields.map((config) => (
            <FormField
              key={config.name}
              config={config}
              control={control}
            />
          ))}
        </Box>
      ))}
    </Stack>
  )
}
