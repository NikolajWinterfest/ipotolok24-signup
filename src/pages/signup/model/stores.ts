// -------------------------------------------- STORES -------------------------------------------- //
import { createStore, sample } from 'effector'
import { fetchCompanyByInnFx } from './effects'
import type { SignupForm, FormErrors } from './types'
import { fieldTouched, formChanged, touchAll } from './events'
import { debounce } from 'patronum'

// Export store «$form»
export const $form = createStore<SignupForm>({
  name: '',
  password: '',
  email: '',
  phone: '',
  inn: '',

  companyName: '',
  account: '',
  address: '',
  kpp: '',
  ogrn: '',
  okved: '',

  agree: false,
  marketing: false,
})
  .on(formChanged, (state, payload) => {
    if ('inn' in payload && payload.inn !== undefined) {
      const innValue = payload.inn
      const clearedCompany =
        innValue.length === 10 || innValue.length === 12
          ? {}
          : {
              companyName: '',
              account: '',
              address: '',
              kpp: '',
              ogrn: '',
              okved: '',
            }

      return { ...state, ...payload, ...clearedCompany }
    }

    return { ...state, ...payload }
  })
  .on(fetchCompanyByInnFx.doneData, (state, payload) => ({
    ...state,
    ...payload,
  }))

// Export store «$touched»
export const $touched = createStore<Partial<Record<keyof SignupForm, boolean>>>(
  {}
)
  .on(fieldTouched, (state, field) => ({ ...state, [field]: true }))
  .on(touchAll, () => ({
    name: true,
    email: true,
    password: true,
    phone: true,
    inn: true,
    agree: true,
  }))

// Export store «$errors»
export const $errors = $form.map((form) => {
  const errors: FormErrors = {}

  // ---------------------------- RegExp ---------------------------- //
  const name = form.name.trim() // RegExp for «name»
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ // RegExp for «email»

  // ---------------------------- Validation ---------------------------- //
  if (!name) errors.name = 'Имя обязательно'
  else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(name))
    errors.name = 'Имя может содержать только буквы и пробел'
  else if (name.replace(/\s/g, '').length < 2) errors.name = 'Минимум 2 буквы'

  if (!form.email) errors.email = 'Email обязателен'
  else if (!emailRegex.test(form.email))
    errors.email = 'Email должен быть в формате xxx@x.xx'

  if (!form.phone) errors.phone = 'Телефон обязателен'
  else if (!/^7\d{10}$/.test(form.phone)) errors.phone = 'Введите 11 цифр'

  if (!form.inn) errors.inn = 'ИНН обязателен'
  else if (!/^\d{10}$|^\d{12}$/.test(form.inn))
    errors.inn = 'ИНН 10 или 12 цифр'

  if (!form.password) errors.password = 'Пароль обязателен'
  else if (form.password.length < 8) errors.password = 'Минимум 8 символов'
  if (!form.agree) errors.agree = 'Необходимо принять условия соглашения'
  return errors
})

// Export store «$hasErrors»
export const $hasErrors = $errors.map(
  (errors) => Object.keys(errors).length > 0
)

// Export store «$innLoading» and «$innError»
export const $innLoading = fetchCompanyByInnFx.pending
export const $innError = createStore<string | null>(null)
  .on(fetchCompanyByInnFx.failData, (_, e) => {
    if (e instanceof Error) return e.message
    return 'Ошибка получения данных'
  })
  .reset(fetchCompanyByInnFx)

// -------------------------------------------- DEBOUNCE -------------------------------------------- //
const innChanged = $form.map((f) => f.inn)

const innDebounced = debounce({
  source: innChanged,
  timeout: 500,
})

sample({
  source: innDebounced,
  filter: (inn) => inn.length === 10 || inn.length === 12,
  target: fetchCompanyByInnFx,
})
