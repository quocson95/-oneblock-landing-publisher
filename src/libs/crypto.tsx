import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const secretKey = "process.env.SESSION_SECRET"
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: string) {
        return new SignJWT({payload})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(encodedKey)
  }
   
  export async function decrypt(session: string | undefined = ''): Promise<JWTPayload>{
    try {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      })
      return payload
    } catch (error) {
      console.log('Failed to verify session')
    }
    return  {};
  }