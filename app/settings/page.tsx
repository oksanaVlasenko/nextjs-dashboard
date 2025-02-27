import Header from "@/app/ui/settings/header";
import SettingsCard from "@/app/ui/settings/settings-card";

export default function Page() {

  return (
    <>
      <Header />

      <section className="py-4 overflow-hidden">
        <div className="container px-4 mx-auto">
          <SettingsCard />
        </div>
      </section>
    </>
   
  )
}