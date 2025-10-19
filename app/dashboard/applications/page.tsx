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
  const applicationSources = (await searchParams).applicationSources || 'Website';


  const applications = await getApplications({
    page: page,
    applicationSources,
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <Application applicationsData={applications} selectedApplicationSources={applicationSources} />
      </div>
    </DashboardLayout>
  );
};

export default page;