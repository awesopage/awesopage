import NextLink from 'next/link'
import { FunctionComponent } from 'react'
import { BiUser, BiUserX } from 'react-icons/bi'
import { TbCircleDotted } from 'react-icons/tb'
import { useEffectOnce } from 'react-use'

import { useGetCurrentUser, useSignOut } from 'pkg-app-store/src/auth/AuthActions'
import { useAppState } from 'pkg-app-store/src/store/AppStore'
import { NavIcon } from 'pkg-app-web/src/page/NavIcon'
import { Button } from 'pkg-lib-ui/src/button/Button'
import { IconButton } from 'pkg-lib-ui/src/button/IconButton'
import { useDisclosure } from 'pkg-lib-ui/src/hook/StateHooks'
import { Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger } from 'pkg-lib-ui/src/layout/Popover'

const SignInLinkButton: FunctionComponent = () => {
  return (
    <NextLink href='/auth/__dev/dev-signin' passHref legacyBehavior>
      <Button as='a' colorScheme='primary' variant='outline' size='sm'>
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
    <Button isLoading={signOutState === 'loading'} onClick={onClickSignOut} variant='ghost' size='sm'>
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
