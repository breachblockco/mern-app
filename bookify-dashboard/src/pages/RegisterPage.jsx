import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";


function RegisterPage() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("Register successfull");
      navigate("/auth/login");
    },
  });

  const handleRegisterSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    mutation.mutate({ name, email, password });
  };

  return (
    <div className="h-screen flex items-center">
      <div className="w-1/4 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Register</CardTitle>
          </CardHeader>
          <div className="mb-5 w-full flex justify-center">
            {mutation.isError && (
              <span className=" text-red-500 text-sm text-center">
                {mutation.error.message}
              </span>
            )}
          </div>
          <CardContent>
            <form onSubmit={handleRegisterSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                    ref={nameRef}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Password"
                    ref={passwordRef}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && (
                    <LoaderCircle className={`animate-spin`} />
                  )}
                  <span>Register</span>
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
