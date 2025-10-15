'use server';
import { revalidatePath } from 'next/cache';
import console from 'console';
import { ApiPagination, ApplicationSource, UserDataType } from '@/lib/Types';
import { fetcher } from '@/lib/fetcher';
import { commonEmptyResponse } from './helper';

export const getApplications = async ({
  page,
  applicationSources = 'AdminPortal',
  search = '',
}: {
  page: string;
  applicationSources: ApplicationSource | '';
  search?: string;
}): Promise<ApiPagination & { data: UserDataType[] }> => {
  try {
    const data = await fetcher(
      `/application/get-application?page=${page}&applicationSources=${applicationSources}&search=${search || ''}`,
      {
        cache: 'no-cache',
        revalidate: 60,
      },
    );

    return data?.data || [];
  } catch (error) {
    console.log(error, 'User fetch error');
    return commonEmptyResponse;
  }
};

export const getApplicationById = async (id: string): Promise<UserDataType | null> => {
  try {
    const data = await fetcher('/application/get-application/' + id, {
      cache: 'no-cache',
      revalidate: 60,
    });
    console.log(data?.data?.data, 'Application data');
    return data?.data?.data || null;
  } catch (error) {
    console.log(error, 'User fetch error');
    return null;
  }
};

export const createApplication = async (body: any) => {
  try {
    const result = await fetcher('/application/create-application', {
      method: 'POST',
      body,
    });
    revalidatePath('/admin/applications');
    return result;
  } catch (error) {
    throw error;
  }
};

export const editApplication = async (body: any) => {
  console.log(JSON.stringify(body), 'body');
  try {
    const result = await fetcher(`/application/update-application`, {
      method: 'PUT',
      body,
    });
    revalidatePath('/admin/applications');
    return result;
  } catch (error) {
    throw error;
  }
};

export const changeStatusApplication = async (body: any) => {
  try {
    const result = await fetcher(`/application/update-application-status`, {
      method: 'PUT',
      body,
    });
    revalidatePath('/admin/applications');
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteApplication = async (id: string) => {
  console.log(`Calling delete API: /application/${id}`);
  try {
    const result = await fetcher(`/application/${id}`, {
      method: 'DELETE',
    });
    console.log('Delete API response:', result);
    revalidatePath('/admin/applications');
    return result;
  } catch (error) {
    console.error('Delete API error:', error);
    // Try alternative endpoint if first one fails
    console.log('Trying alternative endpoint: /application/delete-application/' + id);
    try {
      const result = await fetcher(`/application/delete-application/${id}`, {
        method: 'DELETE',
      });
      console.log('Alternative API response:', result);
      revalidatePath('/admin/applications');
      return result;
    } catch (altError) {
      console.error('Alternative delete API error:', altError);
      throw altError;
    }
  }
};