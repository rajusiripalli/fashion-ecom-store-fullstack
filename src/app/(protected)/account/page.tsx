import Link from "next/link";
import { FiLogOut, FiMapPin, FiPackage, FiUser } from "react-icons/fi";

import FrontendLayout from "@/components/layouts/FrontendLayout";
import Button from "@/components/ui/Button";
import { FaUser } from "react-icons/fa";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { redirect } from "next/navigation";
import { logout } from "@/server-actions/auth/logout";
import { getProfile } from "@/server-actions/user/getProfile";

export const dynamic = "force-dynamic";

export default async function AccountPage() {

      const userProfile = await getProfile();

      if(!userProfile){
        redirect("/signin");
      }

      const address = userProfile.addresses[0];


  return (
    <FrontendLayout>
      <section className="mx-auto max-w-5xl py-12">
        <div>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "My Account" }]}
          />

          <p className="mt-2 text-muted-foreground">
            Manage your profile, orders and account.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {/* Profile */}
          <div className="rounded-2xl border border-border p-6">
            <div className="mb-6 flex items-center gap-3">
              <FiUser size={22} className="text-primary" />

              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>

                <p className="font-medium">{userProfile.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>

                <p className="font-medium">{userProfile.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>

                <p className="font-medium">{userProfile.phone ?? "Not Provided"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>

                <p className="font-medium">
                  {userProfile.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-8 flex  justify-center gap-4 ">
              <Link href="/account/edit">
                <Button leftIcon={<FaUser />}>Edit Profile</Button>
              </Link>

              <Link href="/account/orders">
                <Button variant="outline" leftIcon={<FiPackage size={18} />}>
                  My Orders
                </Button>
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                leftIcon={<FiLogOut />}
                variant="outline"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Address */}
        {address ? (
            <div className="rounded-2xl border border-border p-6">
              <div className="mb-6 flex items-center gap-3">
                <FiMapPin size={22} className="text-primary" />

                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>

              <p>
                {address.firstName} {address.lastName}
              </p>

              <p>{address.street}</p>

              <p>
                {address.city}, {address.state}
              </p>

              <p>{address.country}</p>

              {address.postalCode && <p>{address.postalCode}</p>}

              <p>{address.phone}</p>
            </div>
          )  : (
            <p className="text-muted-foreground">
              No shipping address added yet.
            </p>
          )}
        </div>
      </section>
    </FrontendLayout>
  );
}
