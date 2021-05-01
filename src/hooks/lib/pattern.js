const patternMethods = ({
  backend,
  mergeData,
  subMergeData,
  token,
  setLoading,
  persist,
  navigate,
  setNotification,
  translate,
  showError,
  account,
  people,
  patterns,
  setAccount,
  setPatterns,
  setPeople,
}) => {
  const createPattern = (data) => {
    setLoading(true)
    return backend
      .createPattern(data, token)
      .then((res) => {
        setLoading(false)
        if (res.status === 200) {
          updatePatterns(res.data, res.data.handle)
          setNotification({
            type: 'success',
            msg: translate('app.created'),
          })
          return res.data
        }
      })
      .catch((error) => {
        setLoading(false)
        showError(error)
      })
  }

  const updatePattern = (handle, data) => {
    let newPatterns = { ...patterns }
    newPatterns[handle] = {
      ...newPatterns[handle],
      ...data,
    }
    setPatterns(newPatterns)
    return backend
      .savePattern(handle, data, token)
      .then((res) => {
        if (res.status === 200) {
          setNotification({
            type: 'success',
            msg: translate('app.fieldSaved', { field: translate('app.pattern') }),
          })
        }
      })
      .catch((error) => {
        showError(error)
      })
  }

  const removePattern = (handle) => {
    setLoading(true)
    let newPatterns = { ...patterns }
    delete newPatterns[handle]
    setPatterns(newPatterns)
    return backend
      .removePattern(handle, token)
      .then((res) => {
        setLoading(false)
        if (res.status === 204) {
          setNotification({
            type: 'success',
            msg: translate('app.fieldRemoved', { field: translate('app.pattern') }),
          })
          navigate('/account/patterns/')
        }
      })
      .catch((error) => {
        setLoading(false)
        showError(error)
      })
  }

  const loadPattern = (handle) => {
    return backend
      .loadPattern(handle, token)
      .then((res) => {
        setLoading(false)
        if (res.status === 200) return res.data
        else return false
      })
      .catch((error) => false)
  }

  const savePattern = (data) => backend.savePattern(mergeData({}, data), token)

  const updatePatterns = (value, l1, l2, l3) =>
    setPatterns(mergeData(patterns, [value, l1, l2, l3]))

  return {
    createPattern,
    updatePattern,
    removePattern,
    loadPattern,
    savePattern,
    updatePatterns,
  }
}

export default patternMethods
