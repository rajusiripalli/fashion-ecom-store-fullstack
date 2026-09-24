import AdminLayout from "@/components/layouts/AdminLayout";
//import { requireAdmin } from "@/server-actions/auth/require-auth";

export default async function Admin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //await requireAdmin();
  return <AdminLayout>{children}</AdminLayout>;
}
