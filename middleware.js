import { NextResponse } from 'next/server';

export default function middleware(req) {
  const verify = req.cookies.get('user');
  const url = req.url;

  if (verify && url.includes('/signup')) {
    return NextResponse.redirect('http://localhost:3000/');
  }

  if (verify && url.includes('/login')) {
    return NextResponse.redirect('http://localhost:3000/');
  }
  if (!verify && url.includes('/profile')) {
    return NextResponse.redirect('http://localhost:3000/');
  }
}
