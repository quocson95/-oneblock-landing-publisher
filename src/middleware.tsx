import { NextRequest, NextResponse } from 'next/server'

// 1. Specify protected and public routes
const publicRoutes = ['/auth', "/auth/sso_callback"]

export default async function middleware(req: NextRequest) {
    try {
        // 2. Check if the current route is protected or public
        const path = req.nextUrl.pathname
        const isPublicRoute = publicRoutes.includes(path)
        if (isPublicRoute) {
            console.log('public route. pass')
            return NextResponse.next();
        }

        // 3. Read the token from session storage
        const storedData = req.cookies.get('session')?.value || '';

        const sessionToken = storedData;
        if (sessionToken.length === 0) {
            console.log('key on storage empty')
            return NextResponse.redirect(new URL('/auth', req.nextUrl))
        }
        if (path == "/") {
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
        }
        // 5. Redirect to /dashboard if the user is authenticated
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.next();
    }
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}