import React, { useState } from 'react'
import { Redirect } from 'expo-router';
import HomeScreen from '@/src/components/screens/home/views/HomeScreen';
import { useAuth } from '@/src/context/useAuth';

const App = () => {
  const { isAuthenticated } = useAuth();

  console.log('Is Authenticated:', isAuthenticated); // Log authentication status
  

  return (
    <>
      {isAuthenticated ? (
        <HomeScreen />
      ) : (
        <Redirect href={'/login'} />
      )}
    </>
  )
}

export default App