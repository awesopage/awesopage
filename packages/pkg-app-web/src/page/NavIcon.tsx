import { FunctionComponent } from 'react'

import { Icon, IconProps } from 'pkg-lib-ui/src/icon/Icon'

export const NavIcon: FunctionComponent<IconProps> = (props) => {
  return <Icon width={6} height={6} {...props} />
}
