//src/app/(protected)/layou.tsx
import LayoutWrapper from '@/app/components/layout/LayoutWrapper';
import ProtectedLayout from '@/auth/ProtectedLayout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WithLayout({ children }: { children: React.ReactNode }) {
  return (
  <ProtectedLayout>  
    <ToastContainer position="top-right" autoClose={2000}/> 
    <LayoutWrapper>
      {children}
    </LayoutWrapper> 
  </ProtectedLayout>
  )
}
