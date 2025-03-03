import { fetchWordById } from "@/app/lib/words/data";
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

      <div className="w-auto p-6">
        <h2 className="mb-3 text-3xl font-heading font-medium">
          {word.word}
        </h2>
      </div>

      <div className="px-6 mb-4">
        <div className="border-b border-gray-100">
          <p className="inline-block py-4 pr-16 mr-9 font-heading font-medium border-b-2 border-orange-500 text-orange-500 hover:text-orange-600">
            Word
          </p>
        </div>
      </div>

      { word && 
        <EditWord 
          data={word}
        />
      }
    </main>
  )
}