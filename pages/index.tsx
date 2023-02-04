import { useUser } from '@auth0/nextjs-auth0'
import Layout from '../components/layout'
import UploadAndDisplayImage from '../components/UploadAndDisplayImage'

const Home = () => {
  const { user, isLoading } = useUser()

  return (
    <Layout user={user} loading={isLoading}>

      {isLoading && <p>Loading login info...</p>}

      {!isLoading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to navigate between
            protected routes: client rendered, server rendered profile pages,
            and <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <UploadAndDisplayImage />
      )}
    </Layout>
  )
}

// fast/cached SSR page
export default Home
