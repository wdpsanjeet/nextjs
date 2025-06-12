import './globals.css';
import StoreProvider from './StoreProvider';

export const metadata = {
  title: 'IPL Ticket Booking',
  description: 'Book your IPL match tickets online',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
