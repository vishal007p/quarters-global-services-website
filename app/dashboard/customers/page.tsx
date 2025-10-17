import React from 'react';
import Users from './Users';
import hasAccess from '@/hooks/useAccessControl/hasAccess';
import { PERMISSIONS_LIST_ENUM } from '@/hooks/useAccessControl/permissions';
import { redirect } from 'next/navigation';
import { getAllCustomers } from '@/services/customerService';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; from?: string; to?: string; status?: string }>;
}) => {
  const page = (await searchParams).page || '1';
  const search = (await searchParams).q || '';
  const from = (await searchParams).from || '';
  const to = (await searchParams).to || '';
  const status = (await searchParams).status || '';

  const access = await hasAccess({ permission: PERMISSIONS_LIST_ENUM.users });
  if (!access) {
    return redirect('/admin/home');
  }

  // Fetch customers data
  const customersData = await getAllCustomers({ page, search, from, to, status });

  return <Users customersData={customersData.data} currentPage={parseInt(page)} />;
};

export default page;