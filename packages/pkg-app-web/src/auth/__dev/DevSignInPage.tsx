import { NextPage } from 'next'
import { FormEvent, FunctionComponent, useState } from 'react'

import { DevCreateSignedAuthDataDTO } from 'pkg-app-shared/src/auth/__dev/DevCreateSignedAuthDataDTO'
import { useDevCreateSignedAuthData } from 'pkg-app-store/src/auth/__dev/DevAuthActions'
import { postForm } from 'pkg-app-store/src/common/FormRequest'
import { ColorModeToggle } from 'pkg-app-web/src/page/ColorModeToggle'
import { Button } from 'pkg-lib-ui/src/button/Button'
import { useToast } from 'pkg-lib-ui/src/content/Alert'
import { SelectInput } from 'pkg-lib-ui/src/form/SelectInput'
import { TextInput } from 'pkg-lib-ui/src/form/TextInput'
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

interface SignInAccount {
  readonly email: string
  readonly displayName: string
}

const accounts: SignInAccount[] = [
  {
    email: 'admin1@example.com',
    displayName: 'Admin 1',
  },
  {
    email: 'admin2@example.com',
    displayName: 'Admin 2',
  },
  {
    email: 'user1@example.com',
    displayName: 'User 1',
  },
  {
    email: 'user2@example.com',
    displayName: 'User 2',
  },
]

interface AccountSelectInputProps {
  readonly value: SignInAccount
  readonly onChange: (value: SignInAccount) => void
}

const AccountSelectInput: FunctionComponent<AccountSelectInputProps> = ({ value, onChange }) => {
  const onChangeEmail = (email: string) => {
    onChange(accounts.find((account) => account.email === email) ?? accounts[0])
  }

  return (
    <SelectInput inputId='account' label='Account' value={value?.email} onChange={onChangeEmail}>
      {accounts.map((account) => (
        <option key={account.email} value={account.email}>
          {account.displayName}
        </option>
      ))}
    </SelectInput>
  )
}

interface PasswordTextInputProps {
  readonly value: string
  readonly onChange: (value: string) => void
}

const PasswordTextInput: FunctionComponent<PasswordTextInputProps> = ({ value, onChange }) => {
  return (
    <TextInput
      inputId='password'
      label='Password'
      value={value}
      onChange={onChange}
      type='password'
      autoComplete='off'
    />
  )
}

export const DevSignInPage: NextPage = () => {
  const { createSignedAuthData } = useDevCreateSignedAuthData()
  const { toast } = useToast()

  const [account, setAccount] = useState<SignInAccount>(accounts[0])
  const [password, setPassword] = useState('')
  const [isSigningIn, setSigningIn] = useState(false)

  const onClickSignIn = async () => {
    if (!password) {
      return
    }

    setSigningIn(true)

    const options: DevCreateSignedAuthDataDTO = {
      email: account.email,
      password,
      displayName: account.displayName,
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
    <Flex flexFlow='column' height='full'>
      <TopBar />
      <form onSubmit={onSubmitForm}>
        <Stack width='xs' marginTop='20vh' marginX='auto'>
          <AccountSelectInput value={account} onChange={setAccount} />
          <PasswordTextInput value={password} onChange={setPassword} />
          <Button isLoading={isSigningIn} onClick={onClickSignIn} colorScheme='primary' isDisabled={!password}>
            Sign in
          </Button>
        </Stack>
      </form>
    </Flex>
  )
}
