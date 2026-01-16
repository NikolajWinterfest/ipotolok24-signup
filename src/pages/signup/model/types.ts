// -------------------------------------------- TYPES -------------------------------------------- //
// VALUES // Export type «SignupForm»
export type SignupForm = {
  // Input fields for User
  name: string
  password: string
  email: string
  phone: string
  inn: string

  // Autofill input fields
  companyName: string
  account: string
  address: string
  kpp: string
  ogrn: string
  okved: string

  // Checkbox's
  agree: boolean
  marketing: boolean
}

// ERRORS // Export type «FormErrors»
export type FormErrors = Partial<Record<keyof SignupForm, string>>
