//import { getDashboardStats } from "@/server-actions/admin/getDashboardStats";
import {
  FiPackage,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";



export default async function AdminDashboardPage() {
  // const {
  //   totalUsers,
  //   totalProducts,
  //   totalOrders,
  // } = await getDashboardStats();

  const stats = [
    {
      title: "Total Users",
      value: 5,
      icon: FiUsers,
    },
    {
      title: "Total Products",
      value: 20,
      icon: FiPackage,
    },
    {
      title: "Total Orders",
      value: 100,
      icon: FiShoppingBag,
    },
  ];

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-border bg-background p-6 transition hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-semibold">
                    {stat.value.toLocaleString()}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}