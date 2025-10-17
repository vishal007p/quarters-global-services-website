'use client';
import React, { useEffect, useState, useTransition } from 'react';
import DocumentForm from './DocumentForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import ComboSelect from './components/ComboSelect';
import PackageAddons from './components/PackageAddons';
import { toast } from 'sonner';
import { createApplicationValidator, CreateApplicationType } from './schemas/index';

import { emailSchema } from '@/lib/formSchemaFunctions';
import {
  changeStatusApplication,
  createApplication,
  editApplication,
} from '@/services/applicatonService';
import handleAsync from '@/lib/handleAsync';
 import Link from 'next/link';
import { getUsers } from '@/services/usersService';
import { applicationSources, ApplicationStatus, applicationStatuses } from '@/lib/Types';
import { uploadFile } from '@/lib/uploadFile';
import { Spinner } from '@/components/ui/spinner';
 

const ApplicationForm = ({
  isView = false,
  isEdit = false,
  applicationData,
}: {
  isView?: boolean;
  isEdit?: boolean;
  applicationData?: any;
}) => {
  console.log(applicationData, 'applicationData');

  // Helper function to extract addon IDs from application data

  const [isSubCategoriesAvailable, setIsSubCategoriesAvailable] = useState(
    !!applicationData?.platformServiceSubCategoryId,
  );
  const [selectedCategory, setSelectedCategory] = useState(
    applicationData?.serviceFields?.serviceType || '',
  );
  const [startCheckUserLoading, setCheckUserLoading] = useTransition();
  const form = useForm<CreateApplicationType>({
    resolver: zodResolver(createApplicationValidator),
    defaultValues: {
      toCountryId: applicationData?.toCountryId || '',
      platformServiceId: applicationData?.platformServiceId || '',
      platformServiceCategoryId: applicationData?.platformServiceCategoryId || '',
      platformServiceSubCategoryId: applicationData?.platformServiceSubCategoryId || '',
      platformServiceCategoryPackageId: applicationData?.platformServiceCategoryPackageId || '',
      platformServiceCategoryPackageAddonsId:
        applicationData?.platformServiceCategoryPackageAddonsId || [],
      firstName: applicationData?.firstName || '',
      lastName: applicationData?.lastName || '',
      email: applicationData?.email || '',
      phone: applicationData?.phone || '',
      country: applicationData?.address?.country || '',
      address: applicationData?.address?.addressLine1 || '',
      city: applicationData?.address?.city || '',
      state: applicationData?.address?.state || '',
      pincode: applicationData?.address?.zipCode || '',
      notes: applicationData?.description || '',
      // -
      additionalServiceFields: {
        paymentMethod: applicationData?.serviceFields?.paymentMethod || '',
        paymentStatus: applicationData?.serviceFields?.paymentStatus || '',
        totalAmount: applicationData?.serviceFields?.totalAmount || '',
        courierId: applicationData?.serviceFields?.courierId || '',
        paidAmount: applicationData?.serviceFields?.paidAmount || '',
        passportNumber: applicationData?.serviceFields?.passportNumber || '',
        paymentId: applicationData?.serviceFields?.paymentId || '',
      },
      documents: {
        serviceType: applicationData?.serviceFields?.serviceType || 'empty',
      },
    },
    mode: 'all',
  });
  console.log(form.watch(), ':Application form values');
  console.log(form.formState.errors, ':Application form errors');

  const onSubmit = handleAsync(async (values: CreateApplicationType) => {
    // Handle documents upload - send URL strings instead of objects
    const processedDocuments: Record<string, string> = {};
    for (const [key, doc] of Object.entries(values.documents)) {
      if (key === 'serviceType') continue; // Skip serviceType field

      if (doc instanceof File) {
        const uploadedUrl = await uploadFile(doc, `application-${key}`);
        if (!uploadedUrl) {
          throw new Error(`Failed to upload document: ${key}`);
        }
        processedDocuments[key] = uploadedUrl; // Just the URL string
      } else if (typeof doc === 'string' && doc.trim()) {
        processedDocuments[key] = doc; // Existing URL string
      }
    }

    // Transform form data to backend payload format
    const backendPayload = {
      applications: [
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          countryCode: values.phone?.split(' ')[0] || '+1', // Extract country code from phone
          phone: values.phone?.replace(/^\+\d+\s/, '') || '', // Remove country code from phone
          description: values.notes || '',
          address: {
            addressLine1: values.address,
            addressLine2: '',
            city: values.city,
            state: values.state,
            zipCode: values.pincode,
            country: values.country,
          },
          currentLegalAddress: {
            addressLine1: values.address,
            addressLine2: '',
            city: values.city,
            state: values.state,
            zipCode: values.pincode,
            country: values.country,
          },

          status: 'Submitted',
          applicationSource: applicationSources[0],

          toCountryId: values.toCountryId,
          platformServices: [
            {
              platformServiceId: values.platformServiceId,
              platformServiceCategoryId: values.platformServiceCategoryId,
              platformServiceSubCategoryId: values.platformServiceSubCategoryId,
              platformServiceCategoryPackageId: values.platformServiceCategoryPackageId,
              platformServiceCategoryPackageAddonsId: values.platformServiceCategoryPackageAddonsId
                ? values.platformServiceCategoryPackageAddonsId
                : [],
            },
          ],

          serviceFields: {
            ...values.additionalServiceFields,
            serviceType: values.documents.serviceType,
            ...processedDocuments,
          },
        },
      ],
    };
    console.log(backendPayload, 'backendPayload');
    await createApplication(backendPayload);
    toast.success('Application submitted successfully!');
  });

  const onEditSubmit = handleAsync(async (values: CreateApplicationType) => {
    // Handle documents upload - send URL strings instead of objects
    const processedDocuments: Record<string, string> = {};
    for (const [key, doc] of Object.entries(values.documents)) {
      if (key === 'serviceType') continue; // Skip serviceType field

      if (doc instanceof File) {
        const uploadedUrl = await uploadFile(doc, `application-${key}`);
        if (!uploadedUrl) {
          throw new Error(`Failed to upload document: ${key}`);
        }
        processedDocuments[key] = uploadedUrl; // Just the URL string
      } else if (typeof doc === 'string' && doc.trim()) {
        processedDocuments[key] = doc; // Existing URL string
      }
    }

    // Transform form data to backend payload format
    const backendPayload = {
      id: applicationData._id,
      firstName: values.firstName,
      lastName: values.lastName,
      countryCode: values.phone?.split(' ')[0] || '+1',
      phone: values.phone?.replace(/^\+\d+\s/, '') || '',
      description: values.notes || '',
      paymentMode: 'offline',
      address: {
        addressLine1: values.address,
        addressLine2: '',
        city: values.city,
        state: values.state,
        zipCode: values.pincode,
        country: values.country,
      },
      currentLegalAddress: {
        addressLine1: values.address,
        addressLine2: '',
        city: values.city,
        state: values.state,
        zipCode: values.pincode,
        country: values.country,
      },
      status: 'Submitted',
      toCountryId: values.toCountryId,
      platformServices: [
        {
          platformServiceId: values.platformServiceId,
          platformServiceCategoryId: values.platformServiceCategoryId,
          platformServiceSubCategoryId: values.platformServiceSubCategoryId,
          platformServiceCategoryPackageId: values.platformServiceCategoryPackageId,
          platformServiceCategoryPackageAddonsId: values.platformServiceCategoryPackageAddonsId
            ? values.platformServiceCategoryPackageAddonsId
            : [],
        },
      ],
      serviceFields: {
        ...values.additionalServiceFields,
        serviceType: values.documents.serviceType,
        ...processedDocuments,
      },
    };
    console.log(backendPayload, 'backendPayload');
    await editApplication(backendPayload);
    toast.success('Application submitted successfully!');
  });

  // Check is  user data exist when entered email
  const checkExistingUserData = handleAsync(async () => {
    const email = form.getValues('email') || '';
    const validation = emailSchema().safeParse(email);
    if (!validation.success) {
      console.log(validation.error || 'Invalid email');
      return;
    }
    setCheckUserLoading(async () => {
      const user = await getUsers({ search: email })?.then((e) => e?.data?.[0]);
      if (user) {
        form.setValue('firstName', user.firstName || '');
        form.setValue('lastName', user.lastName || '');
        form.setValue('phone', user.phone || '');
        form.setValue('country', user.country || '');
      }
    });
  });

  // Handle application status  change
  const handleApplicationStatusChange = handleAsync(async (status: ApplicationStatus) => {
    const payload = {
      id: applicationData._id,
      status,
    };
    await changeStatusApplication(payload);
    toast.success(`Application status changed to ${status}`);
  });

  // Set default values
  useEffect(() => {
    if (Object.keys(applicationData || {}).length) {
      console.log('Application Data Structure:', applicationData);
      console.log('Platform Services:', applicationData?.platformServices);
      console.log('Direct Addon IDs:', applicationData?.platformServiceCategoryPackageAddonsId);
      console.log(
        'Platform Services Addon IDs:',
        applicationData?.platformServices?.[0]?.platformServiceCategoryPackageAddonsId,
      );
      form.reset({
        toCountryId: applicationData?.toCountryId || '',
        platformServiceId: applicationData?.platformServiceId || '',
        platformServiceCategoryId: applicationData?.platformServiceCategoryId || '',
        platformServiceSubCategoryId: applicationData?.platformServiceSubCategoryId || null,
        platformServiceCategoryPackageId: applicationData?.platformServiceCategoryPackageId || '',
        platformServiceCategoryPackageAddonsId:
          applicationData?.platformServiceCategoryPackageAddonsId || [],
        firstName: applicationData?.firstName || '',
        lastName: applicationData?.lastName || '',
        email: applicationData?.email || '',
        phone: applicationData?.phone || '',
        country: applicationData?.address?.country || '',
        address: applicationData?.address?.addressLine1 || '',
        city: applicationData?.address?.city || '',
        state: applicationData?.address?.state || '',
        pincode: applicationData?.address?.zipCode || '',
        notes: applicationData?.description || '',
        // -
        additionalServiceFields: {
          paymentMethod: applicationData?.serviceFields?.paymentMethod || '',
          paymentStatus: applicationData?.serviceFields?.paymentStatus || '',
          totalAmount: applicationData?.serviceFields?.totalAmount || '',
          courierId: applicationData?.serviceFields?.courierId || '',
          paidAmount: applicationData?.serviceFields?.paidAmount || '',
          passportNumber: applicationData?.serviceFields?.passportNumber || '',
          paymentId: applicationData?.serviceFields?.paymentId || '',
        },
        documents: {
          serviceType: applicationData?.serviceFields?.serviceType || 'empty',
          // Populate existing document fields dynamically
          ...Object.keys(applicationData?.serviceFields || {})
            .filter(
              (key) =>
                key !== 'serviceType' &&
                key !== 'paymentMethod' &&
                key !== 'paymentStatus' &&
                key !== 'totalAmount' &&
                key !== 'courierId' &&
                key !== 'paidAmount' &&
                key !== 'passportNumber' &&
                key !== 'paymentId',
            )
            .reduce(
              (docs, key) => {
                const docData = applicationData?.serviceFields?.[key];
                if (docData) {
                  // Handle both old object format {file: "url"} and new string format "url"
                  if (typeof docData === 'object' && docData.file) {
                    docs[key] = docData.file; // Old format: use the file URL
                  } else if (typeof docData === 'string' && docData.trim()) {
                    docs[key] = docData; // New format: direct URL string
                  }
                }
                return docs;
              },
              {} as Record<string, any>,
            ),
        },
      });
      if (applicationData?.serviceFields?.serviceType) {
        setSelectedCategory(applicationData?.serviceFields?.serviceType);
      }
      if (applicationData?.platformServiceSubCategoryId) {
        setIsSubCategoriesAvailable(true);
      }
    }
  }, [applicationData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(isEdit ? onEditSubmit : onSubmit)} className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-semibold">Application</p>
          <Select
            onValueChange={handleApplicationStatusChange}
            defaultValue={applicationData?.status || 'Submitted'}
            disabled={isView || !isEdit}
          >
            <SelectTrigger className="w-fit min-w-44">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {applicationStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* {!isView && (
            <Select>
              <SelectTrigger className="w-full max-w-52">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectContent>
            </Select>
          )} */}

        {isView && (
          <div className="p-4 bg-primary-300 rounded-lg">
            <p className="font-semibold">Application ID: 00816551</p>
          </div>
        )}

        {/*   Application Details */}

        <div className="space-y-6">
          {/* ---- Service Details ---- */}
          <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
            <p className="col-span-2 font-semibold">Service Details</p>

            <ComboSelect
              name="toCountryId"
              placeholder="Select country"
              apiPath="/country/get-country?page=1&pageSize=256"
              enable={isEdit ? false : true}
            />

            <ComboSelect
              name="platformServiceId"
              placeholder="Select  service"
              enable={isEdit ? false : form.watch('toCountryId') ? true : false}
              apiPath={
                form.watch('toCountryId')
                  ? `/platform-service/get-platform-service?toCountryId=${form.watch('toCountryId')}`
                  : ''
              }
            />

            <ComboSelect
              name="platformServiceCategoryId"
              placeholder="Select ServiceType"
              enable={isEdit ? false : form.watch('platformServiceId') ? true : false}
              apiPath={
                form.watch('platformServiceId')
                  ? `/platform-service-category/get-platform-service-category?platformServiceId=${form.watch('platformServiceId')}&toCountryId=${form.watch('toCountryId')}`
                  : ''
              }
              onSelectIsHaveSubCategory={setIsSubCategoriesAvailable}
              onSelect={() => {
                form.setValue('platformServiceSubCategoryId', '');
              }}
              onSlugSelect={(e) => {
                setSelectedCategory(e);

                form.setValue('documents.serviceType', e as 'empty');
              }}
            />

            {isSubCategoriesAvailable && (
              <ComboSelect
                name="platformServiceSubCategoryId"
                placeholder="Select Category"
                enable={isEdit ? false : form.watch('platformServiceCategoryId') ? true : false}
                apiPath={
                  form.watch('platformServiceCategoryId')
                    ? `/platform-service-category/get-platform-service-category?platformServiceCategoryId=${form.watch('platformServiceCategoryId')}&platformServiceId=${form.watch('platformServiceId')}&toCountryId=${form.watch('toCountryId')}`
                    : ''
                }
                onSlugSelect={(e) => {
                  setSelectedCategory(e);

                  form.setValue('documents.serviceType', e as 'empty');
                }}
              />
            )}

            {(() => {
              const categoryValue =
                form.watch('platformServiceSubCategoryId') ||
                form.watch('platformServiceCategoryId');

              return (
                <ComboSelect
                  name="platformServiceCategoryPackageId"
                  placeholder="Select Package"
                  enable={isEdit ? false : !!categoryValue}
                  apiPath={
                    categoryValue
                      ? `/platform-service-category-package/get-platform-service-category-package?toCountryId=${form.watch('toCountryId')}&platformServiceCategoryId=${categoryValue}`
                      : ''
                  }
                />
              );
            })()}

            {/* Package Addons */}
            {(() => {
              const selectedPackageId = form.watch('platformServiceCategoryPackageId');
              return (
                <div className="col-span-2">
                  <PackageAddons
                    packageId={selectedPackageId || ''}
                    enable={!!selectedPackageId}
                    isEdit={isEdit}
                  />
                </div>
              );
            })()}
          </div>

          {/* Personal Details */}
          <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
            <p className="col-span-2 font-semibold">Personal Details</p>
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between pr-2 items-center">
                    Email
                    {startCheckUserLoading && (
                      <small className="flex items-center gap-2">
                        <Spinner className="size-3" />
                        Searching user...
                      </small>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        checkExistingUserData();
                      }}
                      disabled={isView || isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={(field.value as string) || ''}
                      onChange={field.onChange}
                      placeholder="+1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="additionalServiceFields.passportNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="notes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
            <p className="col-span-2 font-semibold">Current Address</p>
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="pincode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Payment Details */}
          <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
            <p className="col-span-2 font-semibold">Payment Details</p>
            <FormField
              name="additionalServiceFields.paymentMethod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="additionalServiceFields.paymentMethod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="additionalServiceFields.paymentStatus"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="additionalServiceFields.totalAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="additionalServiceFields.paidAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Amount (if partial)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="additionalServiceFields.paymentId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Payment ID(If Applicable)</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="additionalServiceFields.courierId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Assign Courier ID</FormLabel>
                  <FormControl>
                    <Input placeholder="" readOnly={isView} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/*  Documents */}

        <div className="space-y-6">
          <DocumentForm
            isView={isView}
            selectedCategory={selectedCategory}
            existingDocuments={applicationData?.serviceFields || null}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" disabled={form.formState.isSubmitting} asChild>
              <Link href="/admin/applications">Cancel</Link>
            </Button>

            {!isView && (
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Application submitting...' : 'Save Application'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ApplicationForm;