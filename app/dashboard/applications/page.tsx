import React from 'react';
import Application from './Application';
import { getApplications } from '@/services/applicatonService';
import { ApplicationSource } from '@/lib/Types';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; applicationSources?: ApplicationSource }>;
}) => {
  const page = (await searchParams).page || '3';
  const applicationSources = (await searchParams).applicationSources || 'AdminPortal';


  const applications = await getApplications({
    page: page,
    applicationSources,
  });

  return (
    <DashboardLayout>
      <Application applicationsData={applications} selectedApplicationSources={applicationSources} />
    </DashboardLayout>
  );
};

export default page;