import { NextPage } from 'next'
import { FormEvent, FunctionComponent, useState } from 'react'

import { DevCreateSignedAuthDataDTO } from 'pkg-app-shared/src/auth/__dev/DevCreateSignedAuthDataDTO'
import { useDevCreateSignedAuthData } from 'pkg-app-store/src/auth/__dev/DevAuthActions'
import { postForm } from 'pkg-app-store/src/common/FormRequest'
import { ColorModeToggle } from 'pkg-app-web/src/page/ColorModeToggle'
import { Button } from 'pkg-lib-ui/src/button/Button'
import { useToast } from 'pkg-lib-ui/src/content/Alert'
import { FormControl } from 'pkg-lib-ui/src/form/FormControl'
import { Input } from 'pkg-lib-ui/src/form/Input'
import { InputGroup, InputRightAddon } from 'pkg-lib-ui/src/form/InputGroup'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Container } from 'pkg-lib-ui/src/layout/Container'
import { Flex } from 'pkg-lib-ui/src/layout/Flex'
import { Spacer } from 'pkg-lib-ui/src/layout/Spacer'
import { Stack } from 'pkg-lib-ui/src/layout/Stack'
import { SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

const TopBar: FunctionComponent = () => {
  return (
    <Container maxWidth='container.xl' display='flex' padding={SPACE_SMALL}>
      <Spacer />
      <ColorModeToggle />
    </Container>
  )
}

interface EmailIdInputProps {
  readonly value: string
  readonly onChange: (value: string) => void
}

const EmailIdInput: FunctionComponent<EmailIdInputProps> = ({ value, onChange }) => {
  return (
    <FormControl inputId='emailId' label='Email'>
      <InputGroup>
        <Input inputId='emailId' value={value} onChange={onChange} borderRightRadius={0} autoFocus />
        <InputRightAddon>@example.com</InputRightAddon>
      </InputGroup>
    </FormControl>
  )
}

interface PasswordInputProps {
  readonly value: string
  readonly onChange: (value: string) => void
}

const PasswordInput: FunctionComponent<PasswordInputProps> = ({ value, onChange }) => {
  return (
    <FormControl inputId='password' label='Password'>
      <Input inputId='password' value={value} onChange={onChange} type='password' autoComplete='off' />
    </FormControl>
  )
}

export const DevSignInPage: NextPage = () => {
  const { createSignedAuthData } = useDevCreateSignedAuthData()
  const { toast } = useToast()

  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setSigningIn] = useState(false)

  const backgroundColor = useColorModeValue('blackAlpha.50', 'background.800')

  const shouldBlockSignIn = !emailId || !password

  const onClickSignIn = async () => {
    if (shouldBlockSignIn) {
      return
    }

    setSigningIn(true)

    const options: DevCreateSignedAuthDataDTO = {
      email: `${emailId}@example.com`,
      password,
      returnPath: '/',
    }

    createSignedAuthData(options, {
      onReady: (signedAuthData) => {
        postForm(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/auth/callback`, signedAuthData)
      },
      onError: () => {
        toast('Failed to sign in', 'error')
        setSigningIn(false)
      },
    })
  }

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onClickSignIn()
  }

  return (
    <Flex backgroundColor={backgroundColor} flexFlow='column' height='full'>
      <TopBar />
      <form onSubmit={onSubmitForm}>
        <Stack width='sm' marginTop='20vh' marginX='auto'>
          <EmailIdInput value={emailId} onChange={setEmailId} />
          <PasswordInput value={password} onChange={setPassword} />
          <Button
            isLoading={isSigningIn}
            onClick={onClickSignIn}
            colorScheme='primary'
            size='md'
            type='submit'
            isDisabled={shouldBlockSignIn}
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </Flex>
  )
}
