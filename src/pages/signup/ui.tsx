import { Button, Checkbox, Form, Input, message, Spin } from 'antd'
import { useUnit } from 'effector-react'
import {
  $form,
  $touched,
  $errors,
  $hasErrors,
  $innLoading,
  $innError,
  formChanged,
  fieldTouched,
  touchAll,
  submitFormFx,
} from './model/index'
import { documentsLinks } from '../../constants/links'
import React from 'react'

export const SignupForm = () => {
  const [form, onFormChange] = useUnit([$form, formChanged])
  const [touched] = useUnit([$touched])
  const [errors, hasErrors] = useUnit([$errors, $hasErrors])
  const [innLoading, innError] = useUnit([$innLoading, $innError])
  const [submitting, submitForm] = useUnit([submitFormFx.pending, submitFormFx])
  const [touch, touchAllFields] = useUnit([fieldTouched, touchAll])

  const onSubmit = async () => {
    touchAllFields()

    if (hasErrors) return

    try {
      await submitForm(form)
      message.success('Форма успешно отрпавлена!')
    } catch {
      message.error('Ошибка при отправке формы')
    }
  }

  return (
    <Form className="form" layout="vertical">
      {/* USER VALIDATION */}

      <Form.Item
        validateStatus={touched.name && errors.name ? 'error' : ''}
        help={
          touched.name &&
          errors.name && (
            <span style={{ fontWeight: 500, fontSize: 12 }}>{errors.name}</span>
          )
        }
      >
        <Input
          className="form__inputfield"
          placeholder="Имя"
          value={form.name}
          onChange={(e) => {
            onFormChange({ name: e.target.value })
            touch('name')
          }}
        />
      </Form.Item>
      <Form.Item
        validateStatus={touched.password && errors.password ? 'error' : ''}
        help={
          touched.password &&
          errors.password && (
            <span style={{ fontWeight: 500, fontSize: 12 }}>
              {errors.password}
            </span>
          )
        }
      >
        <Input.Password
          className="form__inputfield"
          placeholder="Пароль"
          value={form.password}
          onChange={(e) => {
            onFormChange({ password: e.target.value })
            touch('password')
          }}
        />
      </Form.Item>
      <Form.Item
        validateStatus={touched.email && errors.email ? 'error' : ''}
        help={
          touched.email &&
          errors.email && (
            <span style={{ fontWeight: 500, fontSize: 12 }}>
              {errors.email}
            </span>
          )
        }
      >
        <Input
          placeholder="Email"
          className="form__inputfield"
          value={form.email}
          onChange={(e) => {
            onFormChange({ email: e.target.value })
            touch('email')
          }}
        />
      </Form.Item>
      <Form.Item
        validateStatus={touched.phone && errors.phone ? 'error' : ''}
        help={
          touched.phone &&
          errors.phone && (
            <span style={{ fontWeight: 500, fontSize: 12 }}>
              {errors.phone}
            </span>
          )
        }
      >
        <Input
          className="form__inputfield"
          placeholder="Телефон"
          value={form.phone}
          onChange={(e) => {
            let v = e.target.value.replace(/\D/g, '')
            if (v.startsWith('8')) v = '7' + v.slice(1)
            else if (v.startsWith('7')) v = '7' + v.slice(1)
            else if (v.startsWith('9')) v = '7' + v
            onFormChange({ phone: v.slice(0, 11) })
            touch('phone')
          }}
        />
      </Form.Item>
      <Form.Item
        validateStatus={touched.inn && errors.inn ? 'error' : ''}
        help={
          (touched.inn && errors.inn && (
            <span style={{ fontWeight: 500, fontSize: 12 }}>{errors.inn}</span>
          )) ||
          innError
        }
      >
        <Input
          className="form__inputfield"
          placeholder="ИНН"
          value={form.inn}
          onChange={(e) => {
            onFormChange({ inn: e.target.value })
            touch('inn')
          }}
          suffix={
            <Spin
              size="small"
              style={{ visibility: innLoading ? 'visible' : 'hidden' }}
            />
          }
        />
      </Form.Item>

      {/* COMPANY INFORMATION */}

      <Form.Item className="form__label company-info">
        <Input
          className="form__inputfield"
          placeholder="Компания"
          value={form.companyName}
          disabled
        />
      </Form.Item>
      <Form.Item className="form__label company-info">
        <Input
          className="form__inputfield"
          placeholder="Расчётный счёт"
          value={form.account}
          disabled
        />
      </Form.Item>
      <Form.Item className="form__label company-info">
        <Input
          className="form__inputfield"
          placeholder="Адрес"
          value={form.address}
          disabled
        />
      </Form.Item>
      <Form.Item className="form__label company-info">
        <Input
          className="form__inputfield"
          placeholder="КПП"
          value={form.kpp}
          disabled
        />
      </Form.Item>
      <Form.Item className="form__label company-info">
        <Input
          className="form__inputfield"
          placeholder="ОГРН"
          value={form.ogrn}
          disabled
        />
      </Form.Item>
      <Form.Item className="form__label company-info">
        <Input
          className="form__inputfield"
          placeholder="Код ОКВЭД"
          value={form.okved}
          disabled
        />
      </Form.Item>

      <div className="form__button">
        <Button
          type="primary"
          className="welcome welcome__button button--big button--blue button"
          onClick={onSubmit}
          disabled={hasErrors}
          loading={submitting}
          block
        >
          Присоединиться
        </Button>
      </div>

      <Form.Item
        className="form__label label-checkbox"
        validateStatus={touched.agree && errors.agree ? 'error' : ''}
        help={
          touched.agree &&
          errors.agree && <span style={{ fontSize: 12 }}>{errors.agree}</span>
        }
      >
        <Checkbox
          className="form__checkbox checkbox-agree"
          checked={form.agree}
          onChange={(e) => {
            onFormChange({ agree: e.target.checked })
            touch('agree')
          }}
        >
          <span className="form__checkbox-text">
            Я прочитал и принимаю&nbsp;
            {documentsLinks.map((doc, index) => (
              <React.Fragment key={doc.href}>
                <a
                  className="form__checkbox-link"
                  href={doc.href}
                  target="_blank"
                >
                  {doc.label}
                </a>
                {index < documentsLinks.length - 1 && ', '}
              </React.Fragment>
            ))}
          </span>
        </Checkbox>
      </Form.Item>

      <Form.Item className="form__label label-checkbox">
        <Checkbox
          className="form__checkbox checkbox-marketing"
          checked={form.marketing}
          onChange={(e) => onFormChange({ marketing: e.target.checked })}
        >
          <div className="form__checkbox-text">
            Согласен получать маркетинговые и рекламные материалы
          </div>
        </Checkbox>
      </Form.Item>
    </Form>
  )
}
