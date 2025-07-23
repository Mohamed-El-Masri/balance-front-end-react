import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
