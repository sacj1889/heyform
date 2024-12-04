import { FC } from 'react'

import { LogoIcon } from '../components'
import { useTranslation } from '../utils'

export const Branding: FC = () => {
  const { t } = useTranslation()

  return (
    <a className="heyform-branding" href="http://zeroform.in/" target="_blank">
      <LogoIcon /> {t('Made with')} Zeroform
    </a>
  )
}
