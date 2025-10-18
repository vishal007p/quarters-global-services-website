 import CustomerForm from '@/components/form/customerForm/CustomerForm';
import hasAccess from '@/hooks/useAccessControl/hasAccess';
import { PERMISSIONS_LIST_ENUM } from '@/hooks/useAccessControl/permissions';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const access = await hasAccess({ permission: PERMISSIONS_LIST_ENUM.users });
  if (!access) {
    return redirect('/admin/home');
  }

  return (
    <div>
      <p className="py-4 text-lg font-semibold">Add New User</p>
      <CustomerForm />
    </div>
  );
};

export default page;