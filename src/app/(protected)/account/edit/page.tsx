import FrontendLayout from "@/components/layouts/FrontendLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EditProfileForm from "@/components/user/EditProfileForm";

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
 
  return (
    <FrontendLayout>
      <section className="mx-auto max-w-4xl py-12">
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Account",
              href: "/account",
            },
            {
              label: "Edit",
            },
          ]}
        />
        <p className="mt-2 text-muted-foreground">
            Edit your profile.
          </p>

        <EditProfileForm />
      </section>
    </FrontendLayout>
  );
}
