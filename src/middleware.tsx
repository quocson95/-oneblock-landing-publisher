import { KeyTokenSession } from '@/libs/contanst'
import { NextRequest, NextResponse } from 'next/server'
import UseStorage from './libs/userStorage'
// 1. Specify protected and public routes
// const protectedRoutes = ['/dashboard', '/editor']
const publicRoutes = ['/auth']
 
export default async function middleware(req: NextRequest) {
    console.log("middile")
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    // const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    if (isPublicRoute) {
        return NextResponse.next();
    }
    const {getItem} = UseStorage();
    // 3. Read the token from session storage
    const storedData = getItem(KeyTokenSession) || '';
    if (storedData.length === 0) {
        // return NextResponse.next();
        return NextResponse.redirect(new URL('/auth', req.nextUrl))
    }
    // 5. Redirect to /dashboard if the user is authenticated
        return NextResponse.next();
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}