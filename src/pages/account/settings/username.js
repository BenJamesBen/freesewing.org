import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import withLanguage from '../../../components/withLanguage'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import AccountContext from '../../../components/context/account'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ValidIcon from '@material-ui/icons/CheckCircle'
import InvalidIcon from '@material-ui/icons/Warning'

const UsernameSettingPage = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [username, setUsername] = useState(app.account.username)
  const [usernameValid, setUsernameValid] = useState(true)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.username'))
    app.setCrumbs([
      {
        title: app.translate('app.account'),
        slug: '/account/'
      },
      {
        title: app.translate('app.settings'),
        slug: '/account/settings/'
      }
    ])
  }, [])

  // Methods
  const updateUsername = (evt) => {
    let value = evt.target.value
    setUsername(value)
    app.isUsernameAvailable(value).then((result) => setUsernameValid(result))
  }

  return (
    <AppWrapper app={app} context={<AccountContext app={app} />}>
      <Layout app={app} active="account" context={<AccountContext app={app} />} text>
        <TextField
          id="username"
          fullWidth={true}
          label={app.translate('account.username')}
          margin="normal"
          variant="outlined"
          value={username}
          type="text"
          onChange={updateUsername}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {usernameValid ? (
                  <ValidIcon style={{ color: '#40c057' }} data-test="valid" />
                ) : (
                  <InvalidIcon color="error" data-test="invalid" />
                )}
              </InputAdornment>
            )
          }}
        />
        <p style={{ textAlign: 'right' }}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            href="/account/settings"
            data-test="cancel"
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button
            data-test="save"
            size="large"
            style={{ marginLeft: '1rem' }}
            variant="contained"
            color="primary"
            disabled={!usernameValid}
            onClick={() => app.updateAccount([username, 'username'], '/account/settings/')}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
        <Blockquote type="note">
          <FormattedMessage
            id={'account.usernameInfo'}
            values={{ em: (...chunks) => <em>{chunks}</em> }}
          />
        </Blockquote>
      </Layout>
    </AppWrapper>
  )
}

export default withLanguage(UsernameSettingPage)
