
import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge';
import { NextRequest, NextResponse } from 'next/server';
import { app } from './app/lib/firestore';
import { clientConfig, serverConfig } from './app/lib/firebase-config';
 
//export default NextAuth(authConfig).auth;

const PUBLIC_PATHS = ['/','/login','/signup'];

export async function middleware(request: NextRequest) {
	return authMiddleware(request, {
	  loginPath: "/api/login",
	  logoutPath: "/api/logout",
	  apiKey: clientConfig.apiKey,
	  cookieName: serverConfig.cookieName,
	  cookieSignatureKeys: serverConfig.cookieSignatureKeys,
	  cookieSerializeOptions: serverConfig.cookieSerializeOptions,
	  serviceAccount: serverConfig.serviceAccount,
	  handleValidToken: async ({token, decodedToken}, headers) => {
		if (PUBLIC_PATHS.includes(request.nextUrl.pathname)){
			return redirectToHome(request);
		}

		return NextResponse.next({
			request: {
				headers
			}
		});
	  },
	  handleInvalidToken: async (reason) => {
		console.info('Missing or malinformed credentials', {reason});

		return redirectToLogin(request, {
			path: '/login',
			publicPaths: PUBLIC_PATHS
		});
	  },
	  handleError: async (error) => {
		console.error('Unhandled authentication error', {error});

		return redirectToLogin(request, {
			path: '/login',
			publicPaths: PUBLIC_PATHS
		});
	  }
	});
  }
  

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)','/api/logout','/api/login'],
};