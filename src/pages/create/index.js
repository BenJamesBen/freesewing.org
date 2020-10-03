import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import { list } from '@freesewing/pattern-info'
import LineDrawing from '@freesewing/components/LineDrawing'
import capitalize from '@freesewing/utils/capitalize'

const Page = (props) => {
  const app = useApp()

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    post: {
      width: '200px',
      margin: '6px',
      padding: '1rem',
      textAlign: 'center',
      background: app.theme === 'light' ? '#f1f3f5' : '#343a40'
    },
    figure: {
      margin: 0,
      padding: 0
    },
    title: {
      border: 0,
      fontSize: '1.5rem',
      margin: 0,
      padding: 0,
      lineHeight: 1.25
    },
    blurb: {
      fontSize: '1.1rem',
      margin: 0,
      padding: 0
    },
    link: {
      color: 'inherit',
      textDecoration: 'none'
    },
    img: {
      borderRadius: '4px',
      width: '100%'
    }
  }
  if (app.mobile) {
    styles.post.width = '125px'
    styles.post.padding = '0.5rem'
  }

  const context = [
    <h5>
      <FormattedMessage id="app.designs" />
    </h5>,
    <ul>
      {list.map((pattern) => (
        <li key={pattern}>
          <Link to={`/create/${pattern}/`}>{app.translate(`patterns.${pattern}.title`)}</Link>
        </li>
      ))}
    </ul>
  ]

  return (
    <AppWrapper
      app={app}
      title={app.translate('app.chooseADesign')}
      context={context}
      crumbs={[
        {
          slug: '/create/',
          title: app.translate('app.newThing', { thing: app.translate('app.pattern') })
        }
      ]}
      active="designs"
    >
      <div style={styles.wrapper}>
        {list.map((pattern) => {
          let title = app.translate(`patterns.${pattern}.title`)
          return (
            <div key={pattern} style={styles.post} className="shadow">
              <Link
                data-test="post-link"
                to={`/create/${pattern}/`}
                style={styles.link}
                title={title}
              >
                <LineDrawing pattern={pattern} size={app.mobile ? 92 : 164} />
                <h2 style={styles.title}>{capitalize(pattern)}</h2>
                <p style={styles.blurb}>
                  <FormattedMessage id={'patterns.' + pattern + '.title'} />
                </p>
              </Link>
            </div>
          )
        })}
      </div>
    </AppWrapper>
  )
}

export default Page
