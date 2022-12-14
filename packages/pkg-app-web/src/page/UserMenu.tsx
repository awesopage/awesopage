import NextLink from 'next/link'
import { FunctionComponent, RefObject, useRef } from 'react'
import { BiUser, BiUserX } from 'react-icons/bi'
import { TbCircleDotted } from 'react-icons/tb'
import { useEffectOnce } from 'react-use'

import { useGetCurrentUser, useSignOut } from 'pkg-app-store/src/auth/AuthActions'
import { useAppState } from 'pkg-app-store/src/store/AppStore'
import { NavIcon } from 'pkg-app-web/src/page/NavIcon'
import { Button } from 'pkg-lib-ui/src/button/Button'
import { IconButton } from 'pkg-lib-ui/src/button/IconButton'
import { EMPTY_REF, useDisclosure } from 'pkg-lib-ui/src/hook/StateHooks'
import { Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger } from 'pkg-lib-ui/src/layout/Popover'

const SignInLinkButton: FunctionComponent = () => {
  const linkRef = useRef<HTMLAnchorElement>(EMPTY_REF)

  useEffectOnce(() => {
    if (linkRef.current) {
      linkRef.current.focus()
    }
  })

  return (
    <NextLink href='/auth/__dev/dev-signin' passHref legacyBehavior>
      <Button as='a' ref={linkRef as unknown as RefObject<HTMLButtonElement>} colorScheme='primary' variant='outline'>
        Sign in
      </Button>
    </NextLink>
  )
}

const SignOutButton: FunctionComponent = () => {
  const { signOut, signOutState } = useSignOut()

  const onClickSignOut = () => {
    signOut()
  }

  return (
    <Button isLoading={signOutState === 'loading'} onClick={onClickSignOut} variant='ghost'>
      Sign out
    </Button>
  )
}

export const UserMenu: FunctionComponent = () => {
  const isAuthChecked = useAppState('isAuthChecked')
  const currentUser = useAppState('currentUser')
  const { getCurrentUser } = useGetCurrentUser()

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffectOnce(() => {
    if (!isAuthChecked) {
      getCurrentUser()
    }
  })

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-end'>
      <PopoverTrigger>
        <IconButton
          aria-label='User menu'
          icon={<NavIcon as={!isAuthChecked ? TbCircleDotted : currentUser ? BiUser : BiUserX} />}
          colorScheme={isOpen ? 'primary' : 'background'}
          data-test-id={isAuthChecked ? 'ready-user-menu' : ''}
        />
      </PopoverTrigger>
      <PopoverContent>
        {currentUser && (
          <PopoverHeader fontSize='lg' fontWeight='semibold' textAlign='center'>
            {currentUser.displayName}
          </PopoverHeader>
        )}
        <PopoverBody>{currentUser ? <SignOutButton /> : <SignInLinkButton />}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
