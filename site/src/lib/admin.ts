import "server-only";
import { prisma } from "@/lib/db";

export async function listCompaniesWithStats() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.analyticsEvent.groupBy({
    by: ["companyId", "kind"],
    _count: { _all: true },
  });

  return companies.map((company) => {
    const views = counts.find((c) => c.companyId === company.id && c.kind === "view")?._count._all ?? 0;
    const downloads = counts.find((c) => c.companyId === company.id && c.kind === "download")?._count._all ?? 0;
    return { ...company, views, downloads };
  });
}

export async function getCompanyUsage(companyId: string) {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) return null;

  const byItemRaw = await prisma.analyticsEvent.groupBy({
    by: ["section", "itemId", "itemTitle", "kind"],
    where: { companyId },
    _count: { _all: true },
  });
  const byItem = byItemRaw.sort((a, b) => b._count._all - a._count._all);

  const recent = await prisma.analyticsEvent.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
    take: 25,
  });

  return { company, byItem, recent };
}
