import SideImage from "@/app/ui/sign-in/side-image";
import AcmeLogo from "@/app/ui/acme-logo";

interface AuthContainerProps {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps ) {
  return (
    <section className="bg-neutral-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2">
              <div className="px-8 md:px-16 pt-16 pb-20">
                <AcmeLogo />

                <span className="inline-block text-neutral-600 text-xl font-semibold tracking-tight mb-4">
                  

                   Account
                </span>

                <h5 className="text-6xl font-semibold mb-6 font-heading">Try a new learning way</h5>

                <p className="text-neutral-600 font-medium tracking-tight mb-16">At the heart of our success is a diverse and talented team.</p>

                {children}
              </div>
            </div>
            
            <SideImage />
          </div>
        </div>
      </div>
    </section>
  )
}