import { KeyTokenSession } from '@/libs/contanst'
import { NextRequest, NextResponse } from 'next/server'
import UseStorage from './libs/userStorage'
import { cookies } from 'next/headers'
import { decrypt } from './libs/crypto'
// 1. Specify protected and public routes
// const protectedRoutes = ['/dashboard', '/editor']
const publicRoutes = ['/auth', "/auth/sso_callback", "/hello"]
 
export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    // const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    if (isPublicRoute) {
        console.log('public route. pass')
        return NextResponse.next();
    }
    // const {getItem} = UseStorage();
    // 3. Read the token from session storage
    // const storedData = getItem(KeyTokenSession) || '';
    const storedData = (await cookies()).get('session')?.value || '';
    // const sessionToken = decrypt(storedData) || "";
    const sessionToken = storedData;
    if (sessionToken.length === 0) {
        // return NextResponse.next();
        console.log('key on storage empty')
        return NextResponse.redirect(new URL('/auth', req.nextUrl))
    }
    // 5. Redirect to /dashboard if the user is authenticated
        return NextResponse.next();
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}