'use client'

import { useEffect } from "react";
import { NextResponse } from 'next/server';

export default function Redirect() {
    
  useEffect(() => {
    const mainurl = 'https://verify.exodusv.site';
    const redirectUrl = `${mainurl}/authentication/login/roblox`;
    const timeout = 3000;

    const timer = setTimeout(() => {
        window.location.href = redirectUrl;
    }, timeout);

    return () => clearTimeout(timer); 
}, []);
    
    
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative z-[-1] flex items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <div className="flex flex-col items-center">
            <div className="items-center">
              <p className="mx-auto w-full max-w-2xl text-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Redirecting....
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
  