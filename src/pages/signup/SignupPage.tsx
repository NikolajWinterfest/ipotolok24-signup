import Link from 'antd/es/typography/Link'
import { SignupForm } from './ui'
import { documentsLinks } from '../../constants/links'

const SignupPage = () => {
  return (
    <section className="welcome">
      <div className="welcome__content container">
        <div className="welcome__fieldsblock">
          <div className="welcome__header">
            <img
              className="welcome__logo"
              src="../ipotolok24/public/logo.svg"
              alt="logo"
            />
            <h3 className="welcome__title">Присоединиться</h3>
          </div>
          <SignupForm />
          <p className="welcome__question">
            У вас уже есть аккаунт?
            <Link
              href="https://ipotolok24.ru/signin"
              className="welcome__signup-link"
            >
              Войти в систему
            </Link>
          </p>
          <p className="welcome__documents">
            {documentsLinks.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                className="welcome__link welcome-link"
                target="_blank"
              >
                {doc.label}
              </a>
            ))}
          </p>
        </div>
        <div className="welcome__background"></div>
      </div>
    </section>
  )
}

export default SignupPage
