import ClientsTable from "@/app/ui/clients/table";
import { Metadata } from "next";
import { Suspense } from "react";
import AddClientButton from "./addClient";

export const metadata: Metadata = {
    title: 'Clients',
  };


export default async function Page({
    searchParams,
    }: {
        searchParams?: {
            query?: string;
        }
    }) {
        const query = searchParams?.query || "";

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ClientsTable query={query} />
        </Suspense>
    );
}

