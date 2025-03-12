import Header from "@/app/ui/dashboard/header";
import AddWord from "@/app/ui/dashboard/new-word";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add word',
};

export default async function Page() {
  return (
    <>
      <Header />
      
      <AddWord />
    </>
  )
}