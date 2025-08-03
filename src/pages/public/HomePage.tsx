import React from 'react'
import { 
  HeroSection, 
  FeaturedProjects, 
  AboutUsSection, 
  OurLocations 
} from '../../components/ui/home'
import FavoritesTest from '../../components/ui/FavoritesTest'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FavoritesTest />
      <FeaturedProjects />
      <OurLocations />
      <AboutUsSection />
    </div>
  )
}

export default HomePage
