// -------------------------------------------- EFFECTS -------------------------------------------- //
import { API_KEY } from '../../../config/API_KEY'
import type { SignupForm } from './types'
import { createEffect } from 'effector'

// -------------------------------------------- DADATA -------------------------------------------- //

export const fetchCompanyByInnFx = createEffect<string, Partial<SignupForm>>(
  async (inn) => {
    const response = await fetch(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${API_KEY}`,
        },
        body: JSON.stringify({ query: inn }),
      },
    )

    if (!response.ok) {
      throw new Error('Ошибка сети при запросе данных компании')
    }

    const data = await response.json()

    if (!data.suggestions || data.suggestions.length === 0) {
      throw new Error('Компания не найдена')
    }

    const first = data.suggestions[0].data

    return {
      companyName: first.name.short_with_opf,
      address: first.address.unrestricted_value,
      kpp: first.kpp,
      ogrn: first.ogrn,
      okved: first.okved,
      account: first.accounts?.[0]?.value || 'Данные отсутствуют',
    }
  },
)

// -------------------------------------------- SUBMIT FORM -------------------------------------------- //
export const submitFormFx = createEffect<SignupForm, void>(async (form) => {
  if (!form.companyName || !form.address || !form.kpp || !form.ogrn) {
    throw new Error('Данные компании не заполнены')
  }

  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('Форма отправлена: ', form)
})
