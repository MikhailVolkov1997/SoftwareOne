function appInit() {
  const isLocalhost = window.location.hostname === 'localhost'

  if (
    !process.env.REACT_APP_API_DEV_URL &&
    !process.env.REACT_APP_API_PROD_URL
  ) {
    throw new Error('Please provide all required environment variables')
  }

  console.log(process.env)
  return {
    API_URL: isLocalhost
      ? process.env.REACT_APP_API_DEV_URL
      : process.env.REACT_APP_API_PROD_URL
  }
}

export default appInit()
