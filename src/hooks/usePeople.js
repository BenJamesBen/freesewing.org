import { withoutBreasts, withBreasts } from '@freesewing/models'
import { measurements as requiredMeasurements } from '@freesewing/pattern-info'

export default function usePeople(app, design) {
  const required = requiredMeasurements[design]

  const hasRequiredMeasurements = (measurements, required) => {
    if (typeof measurements === 'undefined') return false
    if (typeof required === 'undefined') return false
    for (let m of required) {
      if (
        Object.keys(measurements).indexOf(m) === -1 ||
        measurements[m] === null ||
        measurements[m] === ''
      )
        return false
    }

    return true
  }
  const asSizes = (people) => {
    const sizes = {}
    for (let s in people) sizes[s.slice(4)] = people[s]

    return sizes
  }

  const people = {
    ok: {
      withBreasts: {},
      withoutBreasts: {},
      user: []
    },
    no: {
      withBreasts: {},
      withoutBreasts: {},
      user: []
    }
  }

  // People for users only
  if (app.account.username) {
    for (let person in app.people) {
      if (hasRequiredMeasurements(app.people[person].measurements, required)) {
        people.ok.user.push(app.people[person])
      } else {
        people.no.user.push(app.people[person])
      }
    }
  }

  // Standard models
  const sizes = { withBreasts, withoutBreasts }
  for (let build of ['withBreasts', 'withoutBreasts']) {
    if (hasRequiredMeasurements(sizes[build].size38, required))
      people.ok[build] = asSizes(sizes[build])
    else people.no[build] = asSizes(sizes[build])
  }

  return people
}
