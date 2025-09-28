'use client';
import React from 'react';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
 import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import FormWrapper from './FormWrapper';
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});
const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });
  return (
    <Form {...form}>
      <form className="flex flex-col  py-6 gap-4 mt-3">
        <FormWrapper
          control={form.control}
          name="username"
          type="text"
          placeholder="Email"
          require={true}
          cssStyles="mb-4"
        />
        <FormWrapper
          control={form.control}
          name="username"
          type="password"
          placeholder="Password"
          require={true}
          cssStyles="mb-4"
        />
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center flex-wrap gap-3">
            <Checkbox id="remember" />
            <Label htmlFor="remember " className="text-primary text-xs md:text-sm">
              Remember me
            </Label>
          </div>
          <p className="font-normal text-xs md:text-sm text-primary ">Forget Password?</p>
        </div>
        <Button type="submit" className="text-xl text-white h-16">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;