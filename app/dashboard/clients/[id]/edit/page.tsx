import EditClientForm from '@/app/ui/clients/edit-client-form'; // Ensure the correct path
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'; // Adjust path if needed
import { getClientById } from '@/app/lib/firestore-data'; // Ensure this function fetches a client by ID
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Client',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clients', href: '/dashboard/clients' },
          {
            label: 'Edit Client',
            href: `/dashboard/clients/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditClientForm client={client} />
    </main>
  );
}
