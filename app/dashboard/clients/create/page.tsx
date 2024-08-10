import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

import { Metadata } from "next";
import CreateClientForm from "@/app/ui/clients/client-form";

export const metadata: Metadata = {
    title: 'Create Client',
  };

export default async function page() {
    const customers = await fetchCustomers();

    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Clients', href: '/dashboard/clients' },
                    {
                        label: 'Create Client',
                        href: '/dashboard/client/create',
                        active: true,
                    },
                ]}
            />
            < CreateClientForm />
        </main>
    );
}