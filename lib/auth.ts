import { UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface JwtPayload {
  userId: number
  email: string
  role: UserRole
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
  } catch {
    return null
  }
}

export const getRoleLevel = (role: UserRole): number => {
  const levels = {
    [UserRole.UTILISATEUR]: 0,
    [UserRole.TECHNICIEN_N1]: 1,
    [UserRole.TECHNICIEN_N2]: 2,
    [UserRole.TECHNICIEN_N3]: 3,
    [UserRole.RESPONSABLE]: 4,
    [UserRole.ADMINISTRATEUR]: 5,
  }
  return levels[role]
}

export const canAccessLevel = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return getRoleLevel(userRole) >= getRoleLevel(requiredRole)
}