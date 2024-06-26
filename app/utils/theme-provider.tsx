//STEP: 4 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'use client';
import * as React from 'react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types'; //beacuse we are using typescript
//creating function
export function ThemeProvider({children, ...props}:ThemeProviderProps){
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    //watch- 15:30 to 19:40, code and then come back
}
//OVER: 4("c": ../components & ../components/Header.tsx and "m": ../components/Header.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////