import { fetchWordById } from "@/app/lib/actions";
import Header from "@/app/ui/dashboard/header";
import EditWord from "@/app/ui/words/edit-word";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Word',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const word = await fetchWordById(id)

  if (!word) {
    notFound();
  }

  return (
    <main>
      <Header />

      { word && 
        <EditWord 
          data={word}
        />
      }
    </main>
  )
}