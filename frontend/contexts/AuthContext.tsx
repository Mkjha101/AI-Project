'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export type UserRole = 'admin' | 'tourism-officer' | 'tourist'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  username?: string // For tourists
  officerId?: string // For officers
  adminId?: string // For admins
  assignedLocation?: any // For admin/officer
  blockchainId?: string // For officer/tourist
  profileImage?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  signup: (data: SignupData, role: UserRole) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

interface SignupData {
  name: string
  email: string
  phone: string
  password: string
  username?: string
  officerId?: string
  adminId?: string
  designation?: string
  assignedLocation?: any
  emergencyContacts?: any[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const storedToken = localStorage.getItem('authToken')
      const storedUser = localStorage.getItem('authUser')

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        await verifyToken(storedToken)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/multi-auth/verify', {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`
        }
      })

      if (!response.ok) {
        throw new Error('Token verification failed')
      }

      const data = await response.json()
      if (data.success) {
        setUser(data.user)
      } else {
        logout()
      }
    } catch (error) {
      console.error('Token verification error:', error)
      logout()
    }
  }

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    try {
      setIsLoading(true)
      
      const endpoint = role === 'admin' 
        ? '/api/multi-auth/admin/login'
        : role === 'tourism-officer'
        ? '/api/multi-auth/officer/login'
        : '/api/multi-auth/tourist/login'

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('authToken', data.token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)

      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin')
      } else if (role === 'tourism-officer') {
        router.push('/officer')
      } else {
        router.push('/tourist')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupData, role: UserRole): Promise<void> => {
    try {
      setIsLoading(true)
      
      const endpoint = role === 'admin' 
        ? '/api/multi-auth/admin/signup'
        : role === 'tourism-officer'
        ? '/api/multi-auth/officer/signup'
        : '/api/multi-auth/tourist/signup'

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Signup failed')
      }

      localStorage.setItem('authToken', result.token)
      localStorage.setItem('authUser', JSON.stringify(result.user))
      setToken(result.token)
      setUser(result.user)

      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin')
      } else if (role === 'tourism-officer') {
        router.push('/officer')
      } else {
        router.push('/tourist')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    setToken(null)
    setUser(null)
    router.push('/')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!token,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}