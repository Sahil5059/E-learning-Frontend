'use client';
import './globals.css'
import { Poppins } from "next/font/google";
//dont forget to write: "'use client'" at the top
import { Josefin_Sans } from 'next/font/google';
import { Work_Sans } from "next/font/google";
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Providers } from './Provider'; //imported in the 21st step

//STEP: 42 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { SessionProvider } from 'next-auth/react';
//OVER: 42 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useLoadUserQuery } from '../redux/features/api/apiSlice'; //imported in the 43rd step
import Loader from './components/Loader/Loader'; //imported in the 43rd step

//STEP: 149 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]});
//OVER: 149 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-workSans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${josefin.variable} ${workSans.variable}`}>
        {/* <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
          <Toaster position='top-center' reverseOrder={false}/>*/} {/* necessary for using "react-hot-toast" */}
        {/* </ThemeProvider> */}

        {/* STEP: 21 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        {/* first comment the above code inside "ThemeProvider" including the "ThemeProvider" tag */}
        <Providers>
          {/* <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
            <Toaster position='top-center' reverseOrder={false}/> */} {/* necessary for using "react-hot-toast" */}
          {/* </ThemeProvider> */}

          {/* STEP: 44 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme="dark" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position='top-center' reverseOrder={false}/>
            </ThemeProvider>
          </SessionProvider>
          {/* watch- 2:46:05 to 2:48:20*/}
          {/* OVER: 44("m": ../redux/features/auth/authApi.ts) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

        </Providers>
        {/* now, our "redux" is connected with the front-end */}
        {/* now, create two files inside the "auth" folder which is in the "feautres" folder present in the "redux" folder named as "authApi.ts" and "authSlice.ts" */}
        {/* OVER: 21("m": ../redux/features/api/authSlice.ts) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

      </body>
    </html>
  );
}

//STEP: 43 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creating loading state for webpage
//first, create a folder named as "Loader" inside the "components" folder and then create 2 files named "Loader.tsx" & "Loader.css" inside the "Loader" folder, code in it and then come back
const Custom:React.FC<{children:React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery(false); //sir wrote "{}" inside the parenthesis but it caused to loading screen to appear after the front-end loaded and we want it appear before any of the front-end stuff loads, so I wrote "true" instead of "{}" and ALHAMDULLILAH!!!, it worked
  
  //STEP: 150 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);
  //watch- 4:56:00 to 4:57:45
  //OVER: 150("m": ./components/Payment/CheckOutForm.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  return(
    <>
      {
        isLoading ? <Loader/> : <>{children}</>
      }
    </>
  )
}
//OVER: 43 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
