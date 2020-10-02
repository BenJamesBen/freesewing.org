import React, { useState, useEffect } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'
import Layout from '../../../components/layouts/default'
import AccountContext from '../../../components/context/account'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const Page = (props) => {
  // Hooks
  const app = useApp()

  if (!app.account.username) return null // FIXME: Show something better than nothing in SSR

  // State
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentReveal, setCurrentReveal] = useState(false)
  const [newReveal, setNewReveal] = useState(false)

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('account.password'))
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
    app.setContext(<AccountContext app={app} />)
  }, [])

  // Methods
  const updateNewPassword = (evt) => setNewPassword(evt.target.value)

  return (
    <AppWrapper app={app}>
      <Layout app={app} active="account" text>
        <TextField
          id="newPassword"
          fullWidth={true}
          label={app.translate('account.newPassword')}
          margin="normal"
          variant="outlined"
          value={newPassword}
          type={newReveal ? 'text' : 'password'}
          onChange={updateNewPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span
                  role="img"
                  aria-label="reveal"
                  onClick={() => setNewReveal(!newReveal)}
                  className="poh"
                >
                  {newReveal ? (
                    <span role="img" aria-label="show" data-test="show">
                      👀{' '}
                    </span>
                  ) : (
                    <span role="img" aria-label="show" data-test="hide">
                      🙈{' '}
                    </span>
                  )}
                </span>
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
            onClick={() => app.updateAccount([newPassword, 'password'], '/account/settings/')}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </p>
      </Layout>
    </AppWrapper>
  )
}

export default Page
